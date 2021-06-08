import React from 'react'
import {
  Button as RBButton
} from 'react-bulma-components'
import RBCForwardRef from '../Shared/RBCForwardRef'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import btnStyle from './Btn.module.scss'
/* eslint-disable react/prop-types */
const Button = ({
  isParallelogram = true,
  renderAs = 'button',
  className,
  ...restProps
}) => {
  return (
    <RBButton
      renderAs={isParallelogram ? 'a' : renderAs}
      className={classNames(
        btnStyle.button,
        {
          [btnStyle.pg]: isParallelogram
        }, className)}
      {...restProps}
    />
  )
}
Button.propTypes = {
  className: PropTypes.string
}
export default RBCForwardRef(Button)
