import React, { useEffect, useState } from 'react'
import {
  Form,
  Heading, Section,
  Container, Columns, Element, Tabs
} from 'react-bulma-components'
import classnames from 'classnames'
import Button from 'components/Button'
import { useForm } from 'react-hook-form'
import withDealers from 'lib/withDealers'
import enquiryStyle from '../../Enquiry/enquiry.module.scss'
import { mobileRegex } from 'lib/pattern'
import withFormSubmit from 'lib/withFormSubmit'
import useSWR from 'swr'
const fetcher = async (size, province, city) => {
  // eslint-disable-next-line no-undef
  const saicDealersUrl = 'https://mp.ebanma.com/app-mp/saicbi/1.0/searchDealerInfoPreSaleListV3'
  const body = `page=1&page_count=${size}&sort=1&isAsc=1&province=${province}&city=${city}`
  const response = await fetch(saicDealersUrl, {
    body,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    mode: 'cors'
  })
  return response.json()
}
/* eslint-disable react/prop-types */
const ExchangeContact = ({
  dealers = [],
  title,
  subtitle,
  onSubmit,
  result
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const [cityList, setCityList] = useState([])
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [exchangeType, setExchangeType] = useState(0)
  const exchangeTypes = [
    '以旧换新',
    '以旧换旧'
  ]

  useEffect(reset, [result])

  const {
    data: {
      data: {
        regionInfoList = []
      } = {}
    } = {}
  } = useSWR([1], fetcher)
  const {
    data: {
      data: {
        dealerInfoPreSales = []
      } = {}
    } = {}
  } = useSWR([province && city ? 100 : 0, province, city], fetcher)

  const formType = exchangeType === 0 ? 'TradeInNewVehicle' : 'TradeInOldVehicle'
  const onFormSubmit = ({
    name,
    phoneNumber,
    dealer,
    dealerCode
  }) => {
    const formData = {
      formType,
      name,
      phoneNumber,
      dealer
    }
    if (exchangeType === 0) {
      const _package = {
        brandId: 12, // 从上汽API网点接口返回
        cityName: city, // 从上汽API网点接口返回
        custName: name,
        brandName: '荣威', // MG | 荣威 | R汽车
        leadsType: 19,
        dealerCode, // 从上汽API网点接口返回
        channelCode: 6, // 不用改
        provinceName: province,
        mediaChannelCode: 4 // 不用改
      }
      formData.package = _package
      formData.location = province
      formData.dealer = dealerInfoPreSales.filter(({ ascCode }) => ascCode === dealerCode)[0]?.ascFullname
    }
    onSubmit && onSubmit(formData)
  }

  return (
    <Section
      backgroundColor='white'
      className={classnames('separator')}
    >
      <Container>
        <Heading
          textAlign='center'
        >{title}
        </Heading>
        <Heading
          renderAs='h5'
          textAlign='center'
          textSize={6}
          subtitle
        >{subtitle}
        </Heading>
        <Tabs align='center'>
          {
            exchangeTypes.map((vType, index) => {
              return (
                <Tabs.Tab
                  key={index}
                  active={exchangeType === index}
                  onClick={() => setExchangeType(index)}
                >{vType}
                </Tabs.Tab>
              )
            })
          }
        </Tabs>
        <form>
          <Columns>
            <Columns.Column size={exchangeType === 0 ? 6 : 4}>
              <Form.Field>
                <Form.Label>
                  您的姓名
                </Form.Label>
                <Form.Control>
                  <input
                    className={classnames('input', {
                      'is-danger': errors.name
                    })}
                    placeholder='您的姓名'
                    {...register('name', { required: true })}
                  />
                </Form.Control>
              </Form.Field>
            </Columns.Column>
            {
              exchangeType === 1 && (
                <Columns.Column size={4}>
                  <Form.Field>
                    <Form.Label>
                      认证中心
                    </Form.Label>
                    <Form.Control>
                      <div className={classnames('select', enquiryStyle.select, {
                        'is-danger': errors.dealer
                      })}
                      >
                        <select
                          {...register('dealer', { required: true })}
                        >
                          <option value=''>选择认证中心</option>
                          {
                            dealers.map(({
                              Dealer: { abbr },
                              databaseId
                            }) => (
                              <option
                                value={abbr}
                                key={databaseId}
                              >{abbr}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                    </Form.Control>
                  </Form.Field>
                </Columns.Column>
              )
            }
            <Columns.Column size={exchangeType === 0 ? 6 : 4}>
              <Form.Field>
                <Form.Label>
                  您的手机号码
                </Form.Label>
                <Form.Control>
                  <input
                    placeholder='您的手机号码'
                    className={classnames('input', {
                      'is-danger': errors.phoneNumber
                    })}
                    {...register('phoneNumber', { required: true, pattern: mobileRegex })}
                  />
                </Form.Control>
              </Form.Field>
            </Columns.Column>
            {
              exchangeType === 0 && regionInfoList.length && (
                <>
                  <Columns.Column size={4}>
                    <Form.Field>
                      <Form.Label>
                        省份
                      </Form.Label>
                      <Form.Control>
                        <div className={classnames('select', enquiryStyle.select, {
                          'is-danger': errors.provinceName
                        })}
                        >
                          <select
                            {...register('provinceName', { required: true })}
                            onChange={(event) => {
                              setCityList(regionInfoList[event.target.value]?.cityJsonArray || [])
                              setProvince(regionInfoList[event.target.value]?.province)
                              setCity('')
                            }}
                          >
                            <option value=''>选择省份</option>
                            {
                              regionInfoList.map(({
                                province
                              }, index) => (
                                <option
                                  value={index}
                                  key={index}
                                >{province}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                  <Columns.Column size={4}>
                    <Form.Field>
                      <Form.Label>
                        城市
                      </Form.Label>
                      <Form.Control>
                        <div className={classnames('select', enquiryStyle.select, {
                          'is-danger': errors.cityName
                        })}
                        >
                          <select
                            {...register('cityName', { required: true })}
                            defaultValue={city}
                            onChange={(event) => {
                              setCity(event.target.value)
                            }}
                          >
                            <option value=''>选择城市</option>
                            {
                              cityList.map(({
                                city
                              }, index) => (
                                <option
                                  value={city}
                                  key={index}
                                >{city}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                  <Columns.Column size={4}>
                    <Form.Field>
                      <Form.Label>
                        选择意向经销商
                      </Form.Label>
                      <Form.Control>
                        <div className={classnames('select', enquiryStyle.select, {
                          'is-danger': errors.dealerCode
                        })}
                        >
                          <select
                            {...register('dealerCode', { required: true })}
                          >
                            <option value=''>选择意向经销商</option>
                            {
                              (dealerInfoPreSales || []).map(({
                                ascCode,
                                ascFullname
                              }, index) => (
                                <option
                                  value={ascCode}
                                  key={index}
                                >{ascFullname}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                </>
              )
            }
          </Columns>
          <Columns alignItems='center'>
            <Columns.Column size={6}>
              <Element>
                <Form.Field>
                  <Form.Control textWeight='medium'>
                    <input
                      type='checkbox'
                      id='privacy-checkbox'
                      className={classnames('is-checkradio', 'is-small',
                        {
                          'is-danger': errors.privacy
                        })}
                      {...register('privacy', { required: true })}
                    />
                    <label htmlFor='privacy-checkbox' className={classnames('checkbox', enquiryStyle.declare)}>
                      我已阅读并同意保密政策。
                    </label>
                  </Form.Control>
                </Form.Field>
                <p className={enquiryStyle.declare}>您的相关信息将只用于上汽乘用车相关的市场活动，
                  不会泄露给任何第三方！
                </p>
              </Element>
            </Columns.Column>
            <Columns.Column size={6}>
              <Form.Field>
                <Form.Control>
                  <Button
                    color='dark'
                    fullwidth
                    onClick={handleSubmit(onFormSubmit)}
                  ><span>提交</span>
                  </Button>
                </Form.Control>
              </Form.Field>
            </Columns.Column>
          </Columns>
        </form>
      </Container>
    </Section>
  )
}
export default withFormSubmit(withDealers(ExchangeContact))
