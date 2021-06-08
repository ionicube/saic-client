import React, {
  useState
} from 'react'
import Page from 'components/Page'
import { carByIdQuery } from 'lib/graphql'
import useApolloGql from 'hooks/useApolloGql'
import { numberTo10K } from 'lib/util'
import {
  Heading,
  Section,
  Container,
  Content,
  Columns,
  Element
} from 'react-bulma-components'
import { Swiper, SwiperSlide } from 'components/Swiper'
import VehicleStyle from './Vehicles.module.scss'
import Image from 'components/AsImage'
import moment from 'moment'
import Link from 'next/link'
import Button from 'components/Button'
import Configuration from './Configuration'
import Related from './Related'
import DealerContact from '../Contact/DealerContact'
import dynamic from 'next/dynamic'
import NextHead from 'next/head'
const Share = dynamic(
  () => import('social-share-react'),
  { ssr: false }
)
/* eslint-disable react/prop-types */
const VehicleDetail = ({
  id
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const {
    data: {
      car: {
        cid,
        carInfor = {}
      } = {}
    } = {}
  } = useApolloGql(carByIdQuery, { variables: { id } })
  const {
    buyPrice = 0,
    pics = '',
    displayMileage,
    licenseDate,
    vin,
    levelId: vehicleInfo,
    orgId: {
      databaseId: dealerId,
      Dealer: dealer
    } = {}
  } = carInfor
  const {
    modelData: {
      oilType,
      vehicleModel,
      brand,
      selledName,
      gearNumber,
      transmissionType,
      sweptVolume,
      sweptVolumeStandard
    } = {}
  } = vehicleInfo || {}
  const images = pics.split(',')
  const title = vehicleModel && `${vehicleModel} ${selledName}`
  const {
    abbr,
    address,
    companyTel
  } = dealer || {}
  const pageProps = {
    heroProps: {
      cover: '/banner/buy@2x.jpg',
      autoHieght: true,
      centered: true,
      children: vehicleInfo && (
        <Element>
          <Heading
            textColor='white'
            size={3}
          >{title}
          </Heading>
          <Heading textColor='white' size={4} subtitle>￥{numberTo10K(buyPrice)}万</Heading>
        </Element>
      )
    },
    breadcrumbs: [
      { title: '我要买车', href: '/buy' },
      { title }
    ],
    back: { title: '返回搜索结果', href: '/buy' }
  }

  return (
    <Page {...pageProps}>
      {
        cid && (
          <>
            <NextHead>
              <title>{title}</title>
            </NextHead>
            <Section className={VehicleStyle.detail}>
              <Container>
                <Element
                  tablet={{ display: 'flex' }}
                  alignItems='center'
                  justifyContent='space-between' mb={5}
                >
                  <Element><Heading renderAs='h3'>{title}</Heading></Element>
                  <Element>
                    <Heading renderAs='h4'>￥{numberTo10K(buyPrice)}万</Heading>
                  </Element>
                </Element>
                <Element>
                  <Columns breakpoint='desktop'>
                    <Columns.Column desktop={{ size: 6 }} tablet={{ size: 12 }}>
                      <Content>
                        <Swiper
                          loop
                          spaceBetween={10}
                          thumbs={{ swiper: thumbsSwiper }}
                          navigation
                        >
                          {
                            images.map((image, index) => {
                              return (
                                <SwiperSlide key={index}>
                                  <Image
                                    size='3by2'
                                    src={image}
                                    marginless
                                  />
                                </SwiperSlide>
                              )
                            })
                          }
                        </Swiper>
                        <Swiper
                          className={VehicleStyle.thumbSwiper}
                          onSwiper={setThumbsSwiper}
                          spaceBetween={10}
                          slidesPerView={5}
                          watchSlidesVisibility
                          watchSlidesProgress
                          loop
                        >
                          {
                            images.map((image, index) => {
                              return (
                                <SwiperSlide key={index}>
                                  <Image
                                    size='3by2'
                                    src={image}
                                  />
                                </SwiperSlide>
                              )
                            })
                          }
                        </Swiper>
                        <span>图片: {images.length}</span>
                      </Content>
                    </Columns.Column>
                    <Columns.Column desktop={{ size: 6 }} tablet={{ size: 12 }}>
                      <Columns>
                        <Columns.Column size={6}>
                          <Content>
                            <ul className={VehicleStyle.params}>
                              <li>
                                <span>上牌时间</span>
                                <span>{moment(licenseDate).format('YYYY-MM')}</span>
                              </li>
                              <li>
                                <span>行驶里程</span>
                                <span>{displayMileage}公里</span>
                              </li>
                              <li>
                                <span>燃料类型</span>
                                <span>{oilType}</span>
                              </li>
                              <li>
                                <span>变速器</span>
                                <span>{isNaN(gearNumber) ? gearNumber : `${gearNumber}速`}{transmissionType}</span>
                              </li>
                              <li>
                                <span>排量</span>
                                <span>{sweptVolume}</span>
                              </li>
                              <li>
                                <span>排放标准</span>
                                <span>{sweptVolumeStandard}</span>
                              </li>
                            </ul>
                            <Element my={4} className={VehicleStyle.dealer}>
                              <strong>{abbr}</strong>
                              <span>{address}</span>
                              <Element
                                textSize={4}
                                renderAs='strong'
                              >{companyTel}
                              </Element>
                              {
                                dealerId && (
                                  <Element mt={4}>
                                    <Link href={`/buy?org=${dealerId}`}>
                                      <a className={VehicleStyle.link}>
                                        整个经销商库存
                                      </a>
                                    </Link>
                                  </Element>
                                )
                              }
                            </Element>
                            <img
                              className={VehicleStyle.warranty}
                              src={require('assets/warranty-logo.png')}
                              alt=''
                            />
                          </Content>
                        </Columns.Column>
                        <Columns.Column size={6}>
                          <Button
                            color='dark'
                            fullwidth
                          ><span>查询底价</span>
                          </Button>
                          {/* <Button */}
                          {/*  mt={4} */}
                          {/*  color='dark' */}
                          {/*  outlined */}
                          {/*  fullwidth */}
                          {/* ><span>收藏</span> */}
                          {/* </Button> */}
                          <Element mt={4}>
                            <Element textWeight='medium' mb={1}>推荐这台车</Element>
                            <Share
                              sites={['wechat', 'weibo', 'qq']}
                            >
                              <a key='wechat' className={VehicleStyle.link}>微信</a> |
                              <a key='weibo' className={VehicleStyle.link}> 微博</a> |
                              <a key='qq' className={VehicleStyle.link}>QQ</a>
                            </Share>
                          </Element>
                        </Columns.Column>
                      </Columns>
                    </Columns.Column>
                  </Columns>
                </Element>
                <Configuration
                  title={title}
                  vehicleInfo={vehicleInfo}
                />
                <DealerContact
                  vehicleVin={vin}
                  vehicle={title}
                  currentDealer={{ ...dealer, dealerId }}
                />
                <Related random={Math.round(Math.random() * 30)} {...carInfor} />
              </Container>
            </Section>
          </>
        )
      }
    </Page>
  )
}
export default VehicleDetail
