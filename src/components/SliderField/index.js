import React, {
  useState
} from 'react'
import Slider from 'rc-slider'
import {
  Heading,
  Content,
  Element,
  Columns, Tabs
} from 'react-bulma-components'
import classnames from 'classnames'
import sfStyle from './Sf.module.scss'
/* eslint-disable react/prop-types */
const SliderField = ({
  label,
  valueFormat = () => {},
  valueChange = () => {},
  ...slierProps
}) => {
  const {
    defaultValue = 0
  } = slierProps
  const [value, setValue] = useState(defaultValue)
  const onAfterChange = (v) => {
    valueChange(v)
  }
  return (
    <Element className={classnames(sfStyle.sf)}>
      <label className='label'>{label}</label>
      <Slider
        onAfterChange={onAfterChange}
        onChange={(v) => setValue(v)}
        {...slierProps}
      />
      <span className={sfStyle.r}>{typeof valueFormat === 'function' && valueFormat(value)}
      </span>
    </Element>
  )
}
export default SliderField
