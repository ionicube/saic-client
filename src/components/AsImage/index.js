import React from 'react'
import {
  Image
} from 'react-bulma-components'
import asImageStyle from './AsImage.module.scss'
import RBCForwardRef from 'components/Shared/RBCForwardRef'
/* eslint-disable react/prop-types */
const AsImage = ({
  src,
  srcBase = 'https://images.autostreets.com/',
  ...rest
}) => {
  return (
    <Image
      className={asImageStyle.image}
      src={`${srcBase}${src}`}
      {...rest}
    />
  )
}
export default RBCForwardRef(AsImage)
