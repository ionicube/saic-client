import moment from 'moment'
import { createApolloClient } from 'lib/apolloClient'
import {
  loginMutation,
  refreshJwtAuthTokenMutation,
  vehicleDataQueryByLevelId,
  coxDataQueryByVin,
  dealerQuery
} from 'lib/graphql'
import {
  vehicleAcfFields,
  coxAcfFields,
  coxFilterFields
} from 'lib/acf'
import neatCsv from 'neat-csv'
const WPAPI = require('wpapi')

const getRomteData = async (url) => {
  // eslint-disable-next-line no-undef
  const data = await fetch(url)
  const text = await data.text()
  return await neatCsv(text)
}

export default async (req, res) => {
  const authApolloClient = createApolloClient()
  let userAuthToken
  let jwtRefreshToken
  try {
    const {
      data: {
        login: {
          authToken,
          refreshToken
        }
      }
    } = await authApolloClient.mutate({
      mutation: loginMutation,
      variables: {
        username: process.env.JWT_AUTH_USER,
        password: process.env.JWT_AUTH_PASSWORD
      }
    })
    userAuthToken = authToken
    jwtRefreshToken = refreshToken
  } catch (e) {
    return res.status(401).json({ message: 'Authentication error' })
  }

  const date = req.query?.date || moment().format('YYYY-MM-DD')
  const coxURL = `https://prod-mysql.s3.cn-east-2.jdcloud-oss.com/cox/cox_${date}.csv`
  const vehicleURL = `https://prod-mysql.s3.cn-east-2.jdcloud-oss.com/vehicle/vehicle_${date}.csv`
  const vehicleDataArr = await getRomteData(vehicleURL)

  let apolloClient
  const setAuthenticatedClient = () => {
    const headers = {
      Authorization: `Bearer ${userAuthToken}`
    }
    apolloClient = createApolloClient({ headers })
  }

  setInterval(async () => {
    const {
      data: {
        refreshJwtAuthToken: {
          authToken
        }
      }
    } = await authApolloClient.mutate({
      mutation: refreshJwtAuthTokenMutation,
      variables: { jwtRefreshToken }
    })
    userAuthToken = authToken
    setAuthenticatedClient()
  }, 4 * 60 * 1000)

  setAuthenticatedClient()

  const fetchPolicy = 'no-cache'

  const wp = new WPAPI({
    endpoint: process.env.REST_ENDPOINT,
    // This assumes you are using basic auth, as described further below
    username: process.env.JWT_AUTH_USER,
    password: process.env.JWT_AUTH_PASSWORD,
    auth: true
  })
  wp.vehicles = wp.registerRoute('wp/v2', '/car-data')
  wp.vehiclesACF = wp.registerRoute('acf/v3', '/car-data/(?P<id>\\d+)')

  const levelIdMapToDataBaseId = {}
  const categoryMap = {}
  const filterMap = {}
  for (const vehicleData of vehicleDataArr) {
    const {
      brand,
      brand_series: brandSeries,
      vehicle_model: vehicleModel,
      selled_name: selledName,
      model_year: modelYear,
      level_id: levelId,
      category
    } = vehicleData
    categoryMap[levelId] = category
    filterMap[levelId] = {}
    coxFilterFields.forEach(field => {
      filterMap[levelId][field] = vehicleData[field]
    })
    let vehicleId = levelIdMapToDataBaseId[levelId]
    if (vehicleId) {
      console.log(`Duplicated, id: ${vehicleId}, skip.`)
      continue
    }
    try {
      const {
        data: {
          vehicleData: {
            edges: [{
              node: { databaseId } = {}
            } = {}] = []
          } = {}
        }
      } = await apolloClient.query({
        query: vehicleDataQueryByLevelId,
        variables: { levelId },
        fetchPolicy
      })
      vehicleId = databaseId
    } catch (e) {}
    if (!vehicleId) {
      const vehicle = await wp.vehicles().create({
        title: `${brand} ${brandSeries} ${vehicleModel} ${selledName} ${modelYear}`,
        status: 'publish'
      })
      vehicleId = vehicle?.id
      console.log(`create vehicle : ${vehicleId}`)
    } else {
      console.log(`vehicle exist: ${vehicleId}`)
    }
    levelIdMapToDataBaseId[levelId] = vehicleId
    const fields = {}
    vehicleAcfFields.forEach(field => {
      fields[field] = vehicleData[field]
    })
    await wp.vehiclesACF().id(vehicleId).update({
      fields
    })
  }

  const coxDataArr = await getRomteData(coxURL)
  wp.cox = wp.registerRoute('wp/v2', '/car')
  wp.coxACF = wp.registerRoute('acf/v3', '/car/(?P<id>\\d+)')
  const {
    data: {
      dealers: {
        edges: dealers = []
      }
    } = {}
  } = await apolloClient.query({
    query: dealerQuery
  })
  const dealerNameMap = {}
  dealers.forEach(({
    node: {
      Dealer: { abbr },
      databaseId
    }
  }) => {
    dealerNameMap[abbr] = databaseId
  })
  const vinMapToDataBaseId = {}
  for (const coxData of coxDataArr) {
    const {
      vin,
      brand_name: brandName,
      series_name: seriesName,
      model_name: modelName,
      level_id: levelId
    } = coxData
    let coxId = vinMapToDataBaseId[vin]
    if (coxId) {
      console.log(`Duplicated cox, id: ${coxId}, skip.`)
      continue
    }
    try {
      const {
        data: {
          coxData: {
            edges: [{
              node: { databaseId } = {}
            } = {}] = []
          } = {}
        }
      } = await apolloClient.query({
        query: coxDataQueryByVin,
        variables: { vin },
        fetchPolicy
      })
      coxId = databaseId
    } catch (e) {
      console.log(e)
    }
    if (!coxId) {
      const cox = await wp.cox().create({
        title: `${brandName} ${seriesName} ${modelName}`,
        status: 'publish'
      })
      coxId = cox?.id
      console.log(`create cox : ${coxId}`)
    } else {
      console.log(`cox exist: ${coxId}`)
    }
    vinMapToDataBaseId[vin] = coxId
    const fields = levelId ? { ...filterMap[levelId] } : {}
    coxAcfFields.forEach(field => {
      fields[field] = coxData[field]
    })
    fields.level_id = levelIdMapToDataBaseId[coxData.level_id]
    fields.org_id = dealerNameMap[coxData.org_name]
    if (levelId && categoryMap[levelId]) {
      fields.category = categoryMap[levelId]
    }
    await wp.coxACF().id(coxId).update({ fields })
  }

  const updated = {
    vehicle: vehicleDataArr.length,
    cox: coxDataArr.length
  }
  res.status(200).json(updated)
}
