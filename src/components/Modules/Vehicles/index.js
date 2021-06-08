import React, {
  useState
} from 'react'
import { carsQuery } from 'lib/graphql'
import useApolloGql from 'hooks/useApolloGql'
import {
  carsQueryCondition, EQUAL_TO
} from 'lib/metaQuery'
import ListItem from './ListItem'
import {
  Section,
  Container,
  Element,
  Heading
} from 'react-bulma-components'
import Pagination from 'components/Pagination'
import { flattenEdgesNode } from 'lib/util'
import Filter from './Filter'
import VehicleStyle from './Vehicles.module.scss'
import classnames from 'classnames'
import {
  Element as RSElement,
  scroller
} from 'react-scroll'
/* eslint-disable react/prop-types */
const List = ({
  page = 1,
  size = 10,
  paginationChange = () => {},
  org
}) => {
  const [metaConditions, setMetaConditions] = useState(org ? [{ compare: EQUAL_TO, key: 'org_id', value: org }] : [])
  const filterChange = (filters) => {
    metaConditions.push(...filters)
    setMetaConditions([...filters])
  }
  const where = carsQueryCondition(metaConditions, size * (page - 1), size)
  const variables = { where }
  const {
    data: {
      cars = {}
    } = {}
  } = useApolloGql(carsQuery, { variables })
  const {
    pageInfo: {
      offsetPagination: {
        total = 0
      } = {}
    } = {}
  } = cars
  return (
    <Section className={VehicleStyle.list}>
      <Container>
        <Filter
          onChange={filterChange}
          total={total}
          onSubmit={() => {
            scroller.scrollTo('list', {
              duration: 300,
              smooth: true
            })
          }}
        />
        <RSElement name='list' />
        <Element
          pt={6}
          className={classnames('separator')}
        >
          <Heading textAlign='center' size={3} mb={6}>共有二手车车源 {total} 台</Heading>
          {
            flattenEdgesNode(cars).map((car) => (
              <ListItem
                {...car}
                key={car.cid}
              />
            ))
          }
        </Element>
        {
          total > 0 && (
            <Pagination
              current={page}
              pageSize={size}
              total={total}
              onChange={paginationChange}
            />
          )
        }
      </Container>
    </Section>
  )
}
export default List
