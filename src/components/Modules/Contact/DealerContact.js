import React, { useEffect } from 'react'
import {
  Form,
  Heading, Section,
  Container, Columns, Element
} from 'react-bulma-components'
import classnames from 'classnames'
import Button from 'components/Button'
import { useForm } from 'react-hook-form'
import {
  mobileRegex
} from 'lib/pattern'
import withFormSubmit from 'lib/withFormSubmit'
import VehicleStyle from '../Vehicles/Vehicles.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const ReactQMap = dynamic(
  () => import('react-qmap'),
  { ssr: false }
)
/* eslint-disable react/prop-types */
const DealerContact = ({
  currentDealer: {
    dealerId,
    abbr,
    address,
    companyTel,
    latitude,
    longitude
  } = {},
  onSubmit,
  result,
  vehicle,
  vehicleVin
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  useEffect(reset, [result])
  const onFormSubmit = (data) => {
    const formData = {
      vehicle,
      vehicleVin,
      dealer: abbr,
      formType: 'PurchaseVehicle',
      ...data
    }
    onSubmit && onSubmit(formData)
  }
  return (
    <Element
      backgroundColor='white'
      className={classnames('separator')}
      py={6}
    >
      <Heading
        textAlign='center'
        mb={6}
      >联系认证中心
      </Heading>
      <form method='post'>
        <Columns>
          <Columns.Column size={6}>
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
          <Columns.Column size={6}>
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
          <Columns.Column size={6}>
            <Form.Field>
              <Form.Label>
                请输入您的留言
              </Form.Label>
              <Form.Control>
                <textarea
                  className={classnames('textarea')}
                  {...register('remark')}
                />

              </Form.Control>
            </Form.Field>
          </Columns.Column>
          <Columns.Column
            size={6}
            style={{ marginTop: 'auto' }}
          >
            <Form.Field>
              <Form.Control textAlign='right'>
                <Button
                  color='dark'
                  style={{ width: 300 }}
                  onClick={handleSubmit(onFormSubmit)}
                ><span>点击发送</span>
                </Button>
              </Form.Control>
            </Form.Field>
          </Columns.Column>
        </Columns>
      </form>
      <Columns mt={6}>
        <Columns.Column size={4}>
          <Element className={VehicleStyle.dealer}>
            <strong>{abbr}</strong>
            <span>{address}</span>
            <Element
              textSize={4}
              renderAs='strong'
            >{companyTel}
            </Element>
            {
                dealerId && (
                  <Element my={4}>
                    <Link href={`/buy?org=${dealerId}`}>
                      <a>
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
        </Columns.Column>
        <Columns.Column size={8}>
          <Element style={{ height: 350 }}>
            <ReactQMap
              center={{
                latitude,
                longitude
              }}
              getMap={(map, wMap) => {
                // eslint-disable-next-line no-new
                new wMap.Marker({
                  map,
                  position: new wMap.LatLng(latitude, longitude),
                  animation: wMap.MarkerAnimation.DROP
                })
              }}
              apiKey='FA4BZ-XNMKD-OSG4B-HTG6V-IEOS6-UCFZD'
            />
          </Element>
        </Columns.Column>
      </Columns>
    </Element>
  )
}
export default withFormSubmit(DealerContact)
