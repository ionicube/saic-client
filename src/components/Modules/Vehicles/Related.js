import React, {
  useState
} from 'react'
import { carsQuery } from 'lib/graphql'
import useApolloGql from 'hooks/useApolloGql'
import {
  EQUAL_TO,
  carsQueryCondition
} from 'lib/metaQuery'
import {
  Tabs,
  Columns, Element
} from 'react-bulma-components'
import Item from '../LatestVehicle/Item'
import { flattenEdgesNode } from 'lib/util'
import classnames from 'classnames'
/* eslint-disable react/prop-types */
const RealtedVehicle = ({
  category,
  random = 0
}) => {
  const relatedTypes = [
    '相似车源',
    '推荐认证车源'
  ]
  const [activeType, setActiveType] = useState(0)
  const metaConditions = []
  if (activeType === 0) {
    metaConditions.push({ compare: EQUAL_TO, key: 'category', value: category })
  }
  const where = carsQueryCondition(metaConditions, random, 4)
  const variables = { where }
  const {
    data: {
      cars = {}
    } = {}
  } = useApolloGql(carsQuery, { variables })
  const vehicles = flattenEdgesNode(cars)
  return (
    <Element
      py={6}
      my={6}
      className={classnames('separator')}
    >
      <Tabs align='center'>
        {
          relatedTypes.map((vType, index) => {
            return (
              <Tabs.Tab
                key={index}
                active={activeType === index}
                onClick={() => setActiveType(index)}
              >{vType}
              </Tabs.Tab>
            )
          })
        }
      </Tabs>
      <Columns breakpoint='mobile'>
        {
          vehicles.map((vehicle, index) => {
            return (
              <Columns.Column
                mobile={{ size: 6 }}
                tablet={{ size: 6 }}
                desktop={{ size: 3 }}
                key={index}
              >
                <Item {...vehicle} />
              </Columns.Column>
            )
          })
        }
      </Columns>
    </Element>
  )
}
export default RealtedVehicle
