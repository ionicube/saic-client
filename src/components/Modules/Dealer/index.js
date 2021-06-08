import React, { useState, useEffect } from 'react'
import {
  Section,
  Container,
  Columns,
  Element,
  Heading
} from 'react-bulma-components'
import dynamic from 'next/dynamic'
import { dealersQuery } from 'lib/graphql'
import useApolloGql from 'hooks/useApolloGql'
import { flattenEdgesNode } from 'lib/util'
import { pcaa } from 'area-data'
import { AreaSelect } from 'react-area-linkage'
import 'react-area-linkage/dist/index.css'
import dealerStyle from './Dealer.module.scss'
import Button from 'components/Button'
const ReactQMap = dynamic(
  () => import('react-qmap'),
  { ssr: false }
)
const Dealer = () => {
  const {
    data: {
      dealers = {}
    } = {},
    loading
  } = useApolloGql(dealersQuery)
  const [index, setIndex] = useState(0)
  const [map, setMap] = useState(null)
  const [wMap, setWMap] = useState(null)
  const [province, setProvince] = useState(null)
  useEffect(() => {
    if (!(map && wMap)) return
    // eslint-disable-next-line no-new
    new wMap.Marker({
      map,
      position: new wMap.LatLng(latitude, longitude),
      animation: wMap.MarkerAnimation.DROP
    })
  }, [index, map, wMap])
  if (loading) return null
  const fDealers = flattenEdgesNode(dealers)
  const allDealers = flattenEdgesNode(dealers).filter((dealer) => {
    const {
      Dealer: {
        address = ''
      } = {}
    } = dealer
    if (!province) return true
    return address.includes(province)
  })
  const {
    Dealer: {
      latitude,
      longitude
    } = {}
  } = allDealers[index] || fDealers[index]
  const selectedChange = ([p]) => setProvince(p)
  return (
    <Section className={dealerStyle.section}>
      <Container>
        <Heading
          textAlign='center'
          mb={6}
        >经销商搜寻
        </Heading>
        <Element my={6}>
          <Element style={{ width: '66%' }} mb={3}>
            <Columns>
              <Columns.Column size={8}>
                <AreaSelect
                  onChange={selectedChange}
                  level={1}
                  data={pcaa}
                  size='large'
                  type='text'
                />
              </Columns.Column>
              <Columns.Column size={3} offset={1}>
                <Button
                  color='dark'
                  fullwidth
                  onClick={() => setProvince(null)}
                ><span>重置</span>
                </Button>
              </Columns.Column>
            </Columns>
          </Element>
          <Columns>
            <Columns.Column size={8}>
              <ReactQMap
                style={{ minHeight: 300 }}
                center={{
                  latitude,
                  longitude
                }}
                getMap={(map, wMap) => {
                  setMap(map)
                  setWMap(wMap)
                }}
                apiKey='FA4BZ-XNMKD-OSG4B-HTG6V-IEOS6-UCFZD'
              />
            </Columns.Column>
            <Columns.Column
              size={4}
            >
              <Element className={dealerStyle.list}>
                {
                  allDealers.length
                    ? (
                      <ul>
                        {
                          allDealers.map(({
                            databaseId,
                            Dealer: {
                              abbr,
                              address,
                              companyTel,
                              latitude,
                              longitude
                            }
                          }, index) => (
                            <li
                              key={databaseId}
                              onClick={() => setIndex(index)}
                            >
                              <Heading
                                renderAs='h5' size={6}
                                mb={1}
                                textWeight='medium'
                              >{abbr}
                              </Heading>
                              <span>{address}</span>
                              <span>联系电话：{companyTel}</span>
                              <img
                                src={require('assets/warranty-logo.png')}
                                alt=''
                              />
                            </li>
                          ))
                        }
                      </ul>
                      )
                    : (
                      <span>该地区暂无经销商</span>
                      )
                }

              </Element>
            </Columns.Column>
          </Columns>
        </Element>
      </Container>
    </Section>
  )
}
export default Dealer
