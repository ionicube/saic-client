import React, {
  useState
} from 'react'
import {
  Heading,
  Content,
  Columns,
  Element
} from 'react-bulma-components'
import Image from 'components/AsImage'
import moment from 'moment'
import { numberTo10K } from 'lib/util'
import Button from 'components/Button'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'components/Swiper'
import { breakpointsInMinWidth, colors } from 'lib/helpers'
import VehicleStyle from './Vehicles.module.scss'

/* eslint-disable react/prop-types */
const ListItem = ({
  cid,
  carInfor: {
    pics,
    buyPrice,
    displayMileage,
    licenseDate,
    color,
    orgId: {
      Dealer: {
        abbr,
        address,
        companyTel
      }
    },
    levelId: {
      modelData: {
        oilType,
        vehicleModel,
        brand,
        selledName,
        modelYear,
        suggestionPrice,
        gearNumber,
        transmissionType,
        sweptVolume,
        sweptVolumeStandard
      } = {}
    } = {}
  } = {}
}) => {
  const images = pics.split(',')
  const [preview, setPreview] = useState(false)
  const swiperOptions = {
    watchOverflow: true,
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: true,
    breakpoints: {
      [breakpointsInMinWidth.tablet]: {
        slidesPerView: 2
      },
      [breakpointsInMinWidth.widescreen]: {
        slidesPerView: 3
      }
    }
  }
  return (
    <Element className={VehicleStyle.listItem}>
      {
        preview && (
          <Swiper {...swiperOptions} className={VehicleStyle.swiper}>
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
        )
      }
      <Columns breakpoint='desktop'>
        <Columns.Column desktop={{ size: 6 }} tablet={{ size: 12 }}>
          <Link
            href={`/buy/${cid}`}
          >
            <Columns>
              <Columns.Column size={6}>
                <Content>
                  <Image
                    size='3by2'
                    src={images[0]}
                    marginless
                  />
                  <span>图片: {images.length}, 当前浏览人数 0</span>
                </Content>
              </Columns.Column>
              <Columns.Column size={6}>
                <Content>
                  <Heading
                    size={5}
                    renderAs='h4'
                    mb={2}
                  >
                    {modelYear && moment(modelYear).format('YYYY 年')} {vehicleModel} {selledName}
                  </Heading>
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
                    <li>
                      <span>车身颜色</span>
                      <span>{colors[color]}</span>
                    </li>
                  </ul>
                </Content>
              </Columns.Column>
            </Columns>
          </Link>
        </Columns.Column>
        <Columns.Column desktop={{ size: 6 }} tablet={{ size: 12 }}>
          <Columns>
            <Columns.Column size={6}>
              <Content>
                <Heading size={4} mb={2}>￥{numberTo10K(buyPrice)}万</Heading>
                {
                  suggestionPrice && (
                    <span>新车含税价￥{suggestionPrice}万</span>
                  )
                }
                <Element my={4} className={VehicleStyle.dealer}>
                  <strong>{abbr}</strong>
                  <span>{address}</span>
                  <span>{companyTel}</span>
                </Element>
                <img
                  className={VehicleStyle.warranty}
                  src={require('assets/warranty-logo.png')}
                  alt=''
                />
              </Content>
            </Columns.Column>
            <Columns.Column>
              <Link
                href={`/buy/${cid}`}
                passHref
              >
                <Button
                  color='primary'
                  fullwidth
                ><span>车辆详情</span>
                </Button>
              </Link>
              <Button
                mt={4}
                color='dark'
                onClick={() => setPreview(!preview)}
                outlined
                fullwidth
              ><span>预览</span>
              </Button>
            </Columns.Column>
          </Columns>
        </Columns.Column>
      </Columns>
    </Element>
  )
}
export default ListItem
