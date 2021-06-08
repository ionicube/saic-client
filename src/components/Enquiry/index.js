import React, {
  useEffect
} from 'react'
import {
  Form,
  Heading,
  Element
} from 'react-bulma-components'
import classnames from 'classnames'
import Button from 'components/Button'
import { useForm } from 'react-hook-form'
import {
  mobileRegex
} from 'lib/pattern'
import withDealers from 'lib/withDealers'
import withFormSubmit from 'lib/withFormSubmit'
import enquiryStyle from './enquiry.module.scss'

/* eslint-disable react/prop-types */
const Enquiry = ({
  dealers = [],
  onSubmit,
  result
}) => {
  const enquiryTypes = {
    PurchaseVehicle: '我要买车',
    SellVehicle: '我要卖车',
    TradeInOldVehicle: '我要置换'
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const onFormSubmit = (data) => {
    const {
      privacy,
      ...formData
    } = data
    onSubmit && onSubmit(formData)
  }
  useEffect(reset, [result])
  return (
    <div className={enquiryStyle.box}>
      <Heading
        renderAs='h2'
        mb={4}
      >请选择您的需求
      </Heading>
      <form
        className={enquiryStyle.f}
        method='post'
      >
        <Form.Field>
          {
            Object.keys(enquiryTypes).map((value, index) => (
              <Element display='inline-block' key={index}>
                <input
                  type='radio'
                  value={value}
                  id={`formType-${value}`}
                  className={classnames('is-checkradio', 'is-small',
                    {
                      'is-danger': errors.formType
                    })}
                  {...register('formType', { required: true })}
                />
                <label
                  className={classnames(
                    'radio',
                    enquiryStyle.radio
                  )}
                  htmlFor={`formType-${value}`}
                >
                  {enquiryTypes[value]}
                </label>
              </Element>

            ))
          }
        </Form.Field>
        <Form.Field>
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
        <Form.Field>
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
                    <option value={abbr} key={databaseId}>{abbr}</option>
                  ))
                }
              </select>
            </div>
          </Form.Control>
        </Form.Field>
        <Form.Field>
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
      </form>
    </div>
  )
}
export default withFormSubmit(withDealers(Enquiry))
