import React from 'react'
import {
  Heading,
  Element
} from 'react-bulma-components'
import Image from 'components/AsImage'
import moment from 'moment'
import lvStyle from './Lv.module.scss'
import { numberTo10K } from 'lib/util'
import Button from 'components/Button'
import Link from 'next/link'
import { fuelType } from 'lib/helpers'
/* eslint-disable react/prop-types */
const Item = ({
  cid,
  carInfor: {
    pics,
    buyPrice,
    displayMileage,
    licenseDate,
    oilType,
    levelId: {
      modelData: {
        vehicleModel,
        brand,
        selledName

      } = {}
    } = {}
  } = {}
}) => {
  const images = pics.split(',')
  return (
    <Element
      className={lvStyle.item}
      display='flex'
      flexDirection='column'
    >
      <Link
        href={`/buy/${cid}`}
      >
        <Image
          size='3by2'
          src={images[0]}
        />
      </Link>
      <Element
        display='flex'
        flexDirection='column'
        className={lvStyle.content}
      >
        <Heading
          size={6}
          renderAs='h4'
          textWeight='medium'
          mt={4}
          mb={1}
        >
          {brand}{vehicleModel} {selledName}
        </Heading>
        <Element
          className={lvStyle.info}
        >{displayMileage}公里{licenseDate && `, ${moment(licenseDate).format('YYYY-MM')}`}, {fuelType[oilType]}
        </Element>
        <div className={lvStyle.ck}>
          <Element
            display='flex'
            alignItems='center'
            my={4}
            className={lvStyle.price}
          >
            <strong>￥{numberTo10K(buyPrice)}万</strong>
            <img
              src={require('assets/warranty-logo.png')}
              alt=''
            />
          </Element>
          <Link
            href={`/buy/${cid}`}
            passHref
          >
            <Button
              color='dark'
              fullwidth
            ><span>车辆详情</span>
            </Button>
          </Link>
        </div>
      </Element>
    </Element>
  )
}
export default Item
