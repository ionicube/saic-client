import { gql } from '@apollo/client'
import {
  vehicleAcfFields,
  coxAcfFields
} from './acf'
import camelcase from 'camelcase'

export const loginMutation = gql`
  mutation loginMutation (
    $username: String!
    $password: String!
  ) {
    login(input: {
      password: $password,
      username: $username
    }) {
      authToken
      refreshToken
    }
  }
`

export const refreshJwtAuthTokenMutation = gql`
  mutation refreshJwtAuthTokenMutation (
    $jwtRefreshToken: String!
  ) {
    refreshJwtAuthToken(input: {
      jwtRefreshToken: $jwtRefreshToken
    }) {
      authToken
    }
  }
`

export const dealerQuery = gql`
  query dealerQuery {
    dealers {
      edges {
        node {
          databaseId
          Dealer {
            abbr
            address
            companyTel
            email
            fieldGroupName
            manager
            managerTel
            name
            tel
          }
        }
      }
    }
  }
`

export const vehicleDataQueryByLevelId = gql`
  query vehicleDataQueryByLevelId ($levelId: String!) {
    vehicleData: carDatas(where: {
      metaQuery: {
        metaArray: {
          key: "level_id",
          value: $levelId,
          compare: EQUAL_TO
        }
      }
    }) {
      edges {
        node { databaseId }
      }
    }
  }
`

export const coxDataQueryByVin = gql`
  query coxDataQueryByVin ($vin: String!) {
    coxData: cars(where: {
      metaQuery: {
        metaArray: {
          key: "vin",
          value: $vin,
          compare: EQUAL_TO
        }
      }
    }) {
      edges {
        node { databaseId }
      }
    }
  }
`

export const vehicleDataIdsQuery = gql`
  query vehicleDataIds {
    vehicleData: carDatas (where: { status: PUBLISH }, first: 0, last: 100000) {
      nodes { id }
    }
  }
`

export const deleteVehicleDataMutation = gql`
  mutation deleteVehicleData ($id: ID!) {
    deleteCarData (input: {
      id: $id
    }) {
      deletedId
    }
  }
`

const dealerFragment = gql`
  fragment dealerFragment on Dealer {
    databaseId
    title
    Dealer {
      abbr
      address
      companyTel
      latitude
      longitude
      order
    }
  }
`

export const dealersQuery = gql`
  query dealers {
    dealers {
      edges {
        node {
          ...dealerFragment
        }
      }
    }
  }
  ${dealerFragment}
`
const vehicleDataFragment = gql`
  fragment vehicleDataFragment on CarData {
    modelData {
      ${vehicleAcfFields.map(camelcase).join('\n')}
    }
  }
`
const coxSimpleFragment = gql`
  fragment coxSimpleFragment on Car {
    cid: id
    carInfor {
      pics
      buyPrice
      displayMileage
      licenseDate
      oilType
      color
      orgId {
        ...dealerFragment
      }
      levelId {
        ... on CarData {
          modelData {
            oilType
            vehicleModel
            brand
            selledName
            modelYear
            suggestionPrice
            gearNumber
            transmissionType
            sweptVolume
            sweptVolumeStandard
          }
        }
      }
    }
  }
  ${dealerFragment}
`

const coxFragment = gql`
  fragment coxFragment on Car {
    cid: id
    title
    carInfor {
      ${coxAcfFields
        .map(camelcase)
        .filter(f => ['orgId', 'levelId'].includes(f) === false)
        .join('\n')}
      levelId {
        ...vehicleDataFragment
      }
      orgId {
        ...dealerFragment
      }
    }
  }
  ${vehicleDataFragment}
  ${dealerFragment}
`

const pageInfoFragment = gql`
  fragment pageInfoFragment on WPPageInfo {
    endCursor
    startCursor
    offsetPagination {
      hasMore
      hasPrevious
      total
    }
  }
`

export const carsQuery = gql`
  query cars ($where: RootQueryToCarConnectionWhereArgs) {
    cars (where: $where) {
      edges {
        node {
          ...coxSimpleFragment
        }
      }
      pageInfo {
        ...pageInfoFragment
      }
    }
  }
  ${coxSimpleFragment}
  ${pageInfoFragment}
`

export const carByIdQuery = gql`
  query car($id: ID!) {
    car (id: $id) {
      ...coxFragment
    }
  }
  ${coxFragment}
`
export const newsQuery = gql`
  query news (
    $offset: Int = 0
    $size: Int = 6
  ) {
    news (where: {
      offsetPagination: {
        offset: $offset
        size: $size
      }
    }) {
      edges {
        node {
          id
          date
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`

export const newsItemQuery = gql`
  query newsItem ($id: ID!) {
    newsItem (id: $id) {
      title
      content
      date
    }
  }
`

export const faqQuery = gql`
  query faqs {
    faqs: categories(where: {parent: 5}) {
      edges {
        node {
          id
          name
          faqs {
            edges {
              node {
                id
                title
                content
              }
            }
          }
        }
      }
    }
  }
`
