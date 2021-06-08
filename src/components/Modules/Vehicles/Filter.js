import React, { useState } from 'react'
import {
  Heading,
  Element,
  Columns,
  Form
} from 'react-bulma-components'
import SliderField from 'components/SliderField'
import classnames from 'classnames'
import { numberTo10K } from 'lib/util'
import {
  EQUAL_TO,
  GREATER_THAN,
  LESS_THAN,
  TYPE_CHAR,
  TYPE_DATE,
  TYPE_NUMERIC
} from 'lib/metaQuery'
import {
  configFilter
} from 'lib/acf'
import {
  colors,
  fuelType
} from 'lib/helpers'
import enquiryStyle from 'components/Enquiry/enquiry.module.scss'
import VehicleStyle from './Vehicles.module.scss'
import Button from 'components/Button'
/* eslint-disable react/prop-types */
const Filter = ({
  onChange = (filters) => {},
  total = 0,
  onSubmit = (filters) => {}
}) => {
  const brandNames = [
    '荣威',
    'MG'
  ]
  const vehicleTypes = [
    '轿车',
    'SUV',
    '旅行车',
    'MPV'
  ]
  const [filters, setFilters] = useState([])
  const updateCondition = (compare, key, value, type = TYPE_CHAR) => {
    const exist = filters.findIndex(({ key: filterKey }) => filterKey === key)
    if (exist !== -1) {
      filters.splice(exist, 1)
    }
    const newFilters = value ? [...filters, { compare, key, value: value.toString(), type }] : [...filters]
    setFilters(newFilters)
    onChange(newFilters)
  }
  return (
    <Element mb={5} pb={5}>
      <Heading textAlign='center'>请选择搜索条件</Heading>
      <Columns>
        <Columns.Column size={3}>
          <SliderField
            min={1000}
            max={300000}
            step={10}
            defaultValue={50000}
            valueFormat={(value) => `￥${numberTo10K(value)}万`}
            valueChange={(v) => updateCondition(LESS_THAN, 'buy_price', v, TYPE_NUMERIC)}
            label='价格'
          />
        </Columns.Column>
        <Columns.Column size={3}>
          <SliderField
            min={25}
            max={100000}
            step={1}
            defaultValue={50000}
            valueChange={(v) => updateCondition(LESS_THAN, 'display_mileage', v, TYPE_NUMERIC)}
            valueFormat={(value) => `高达${value}公里`}
            label='行驶里程'
          />
        </Columns.Column>
        <Columns.Column size={3}>
          <SliderField
            min={2010}
            max={2021}
            step={1}
            defaultValue={2015}
            valueFormat={(value) => `从${value}年起`}
            valueChange={(v) => updateCondition(GREATER_THAN, 'license_date', `${v}-01-01`, TYPE_DATE)}
            fieldName='license_date'
            label='上牌时间'
          />
        </Columns.Column>
        <Columns.Column size={3}>
          <SliderField
            min={50}
            max={300}
            step={1}
            defaultValue={250}
            valueFormat={(value) => `${value}KW`}
            fieldName='max_power'
            valueChange={(v) => updateCondition(LESS_THAN, 'max_power', v, TYPE_NUMERIC)}
            label='功率'
          />
        </Columns.Column>

        <Columns.Column size={3}>
          <Form.Field>
            <Form.Label>品牌</Form.Label>
            <Form.Control>
              <div className={classnames('select', enquiryStyle.select)}>
                <select onChange={(e) => updateCondition(EQUAL_TO, 'brand_name', e.target?.value, TYPE_CHAR)}>
                  <option value=''>全部</option>
                  {
                    brandNames.map((name, index) => (
                      <option value={name} key={index}>{name}</option>
                    ))
                  }
                </select>
              </div>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
        <Columns.Column size={3}>
          <Form.Field>
            <Form.Label>颜色</Form.Label>
            <Form.Control>
              <div className={classnames('select', enquiryStyle.select)}>
                <select onChange={(e) => updateCondition(EQUAL_TO, 'color', e.target?.value, TYPE_CHAR)}>
                  {
                    colors.map((name, index) => (
                      <option value={index === 0 ? '' : index} key={index}>{name || '全部'}</option>
                    ))
                  }
                </select>
              </div>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
        <Columns.Column size={3}>
          <Form.Field>
            <Form.Label>燃料类型</Form.Label>
            <Form.Control>
              <div className={classnames('select', enquiryStyle.select)}>
                <select
                  onChange={(e) => updateCondition(EQUAL_TO, 'oil_type', e.target?.value, TYPE_CHAR)}
                >
                  {
                    fuelType.map((name, index) => (
                      <option value={index === 0 ? '' : index} key={index}>{name || '全部'}</option>
                    ))
                  }
                </select>
              </div>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
        <Columns.Column size={3}>
          <Form.Field>
            <Form.Label>车辆类型</Form.Label>
            <Form.Control>
              <div className={classnames('select', enquiryStyle.select)}>
                <select
                  onChange={(e) => updateCondition(EQUAL_TO, 'category', e.target?.value, TYPE_CHAR)}
                >
                  <option value=''>全部</option>
                  {
                    vehicleTypes.map((name, index) => (
                      <option value={name} key={index}>{name}</option>
                    ))
                  }
                </select>
              </div>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
        {
          Object.keys(configFilter).map((name, index) => {
            return (
              <Columns.Column
                key={index}
                size={2}
                py={1}
              >
                <Form.Field>
                  <Form.Control textWeight='normal'>
                    <Form.Checkbox
                      onChange={(e) => updateCondition(EQUAL_TO, configFilter[name], e.target?.checked ? '有' : null, TYPE_CHAR)}
                    >
                      {name}
                    </Form.Checkbox>
                  </Form.Control>
                </Form.Field>
              </Columns.Column>
            )
          })
        }
        <Columns.Column
          size={4}
          pt={4}
        >
          <Form.Field>
            <Form.Control className={VehicleStyle.wcheckbox}>
              <Form.Checkbox>
                <img style={{ width: 100 }} src={require('assets/warranty-logo.png')} alt='' />
              </Form.Checkbox>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
        <Columns.Column
          size={6}
          offset={2}
          pt={4}
        >
          <Element textAlign='right'>
            <Button
              color='dark'
              mr={2}
              outlined
              onClick={() => onChange([])}
            ><span>重置搜索</span>
            </Button>
            <Button
              color='dark'
              onClick={onSubmit}
            ><span>查看{total ? ` ${total} 个` : ''}结果</span>
            </Button>
          </Element>
        </Columns.Column>
      </Columns>
    </Element>
  )
}
export default Filter
