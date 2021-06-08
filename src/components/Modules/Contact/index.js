import React, { useEffect } from 'react'
import {
  Form,
  Heading, Section,
  Container, Columns, Element
} from 'react-bulma-components'
import classnames from 'classnames'
import Button from 'components/Button'
import { useForm } from 'react-hook-form'
import withDealers from 'lib/withDealers'
import enquiryStyle from '../../Enquiry/enquiry.module.scss'
import { mobileRegex } from 'lib/pattern'
import withFormSubmit from 'lib/withFormSubmit'
/* eslint-disable react/prop-types */
const Contact = ({
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
  const formType = 'ContactUs'
  const onFormSubmit = (data) => {
    const formData = {
      formType,
      ...data
    }
    onSubmit && onSubmit(formData)
  }
  useEffect(reset, [result])
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
        <form method='post'>
          <Columns>
            <Columns.Column size={4}>
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
                          <option value={abbr} key={databaseId}>{abbr}</option>
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
export default withFormSubmit(withDealers(Contact))
