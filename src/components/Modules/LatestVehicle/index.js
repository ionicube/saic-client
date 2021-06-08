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
  Section,
  Container,
  Heading,
  Tabs,
  Columns,
  Element
} from 'react-bulma-components'
import Item from './Item'
import { flattenEdgesNode } from 'lib/util'
import Button from 'components/Button'
import Link from 'next/link'
const LatestVehicle = () => {
  const vehicleTypes = [
    '轿车',
    'SUV',
    '旅行车',
    'MPV'
  ]
  const [activeType, setActiveType] = useState(0)
  const categoryCodition = { compare: EQUAL_TO, key: 'category', value: vehicleTypes[activeType] }
  const where = carsQueryCondition([
    categoryCodition
  ], 0, 4)
  const variables = { where }
  const {
    data: {
      cars = {}
    } = {}
  } = useApolloGql(carsQuery, { variables })
  const vehicles = flattenEdgesNode(cars)
  return (
    <Section>
      <Container>
        <Heading textAlign='center'>上汽认证二手车</Heading>
        <Tabs align='center'>
          {
            vehicleTypes.map((vType, index) => {
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
        <Element
          textAlign='center'
          mt={5}
        >
          <Link
            href='/buy'
            passHref
          >
            <Button
              color='dark'
              outlined
            ><span>展开更多搜索条件</span>
            </Button>
          </Link>
        </Element>
      </Container>
    </Section>
  )
}
export default LatestVehicle
