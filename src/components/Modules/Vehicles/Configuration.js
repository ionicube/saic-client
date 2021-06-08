import React, { useState } from 'react'
import {
  Heading,
  Content,
  Element,
  Columns,
  Tabs,
  Table
} from 'react-bulma-components'
import classnames from 'classnames'
import camelcase from 'camelcase'
import { vehicleConfigs, vehicleConfigGroup, vehicleSpecs } from 'lib/acf'
import VehicleStyle from './Vehicles.module.scss'
/* eslint-disable react/prop-types */
const Configuration = ({
  vehicleInfo: {
    modelData: {
      featureItems = '',
      ...restInfo
    } = {}
  },
  title
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = [
    '标准设备',
    '规格'
  ]
  const vehicleData = activeTab === 0 ? vehicleConfigGroup : vehicleSpecs
  return (
    <Element
      py={6}
      my={6}
      className={classnames('separator')}
    >
      <Heading textAlign='center'>{title}详细资料</Heading>
      <Tabs align='center'>
        {
          tabs.map((name, index) => {
            return (
              <Tabs.Tab
                key={index}
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
              >{name}
              </Tabs.Tab>
            )
          })
        }
      </Tabs>
      <Content mt={6}>
        <Columns>
          {
            Object.keys(vehicleData).map((group, index) => {
              return (
                <Columns.Column
                  tablet={{ size: 4 }}
                  desktop={{ size: 3 }}
                  key={index}
                >
                  <Content className={VehicleStyle.config}>
                    <Table
                      striped
                      bordered
                    >
                      <thead>
                        <tr>
                          <th colSpan={2} className='has-text-centered'>{group}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          [...Array(10)].map((e, index) => {
                            const config = vehicleData[group][index]
                            return (
                              <tr key={index}>
                                <td>{config || '-'}</td>
                                <td>{(vehicleConfigs[config] && restInfo[camelcase(vehicleConfigs[config])]) || '-'}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                  </Content>
                </Columns.Column>
              )
            })
          }
        </Columns>
      </Content>
    </Element>
  )
}
export default Configuration
