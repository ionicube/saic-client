import React from 'react'
import {
  Section,
  Container,
  Columns,
  Element,
  Heading,
  Content
} from 'react-bulma-components'
import classnames from 'classnames'
import exchangeStyle from './Exchange.module.scss'
const Exchange = () => {
  const steps = [
    ['客户接待', '评估师接待客户<br />登记车辆基本信息'],
    ['旧车评估', '评估师对车辆<br />进行免费检测评估'],
    ['评估报价', '根据检测结果<br />确定收购价格'],
    ['置换车辆', '置换上汽新车<br />或上汽认证二手车'],
    ['签约过户', '双方达成意向，<br />签订合同上汽认证二手车中心<br />提供车辆过户服务']
  ]
  const icons = [
    require('./assets/e1@2x.png'),
    require('./assets/e2@2x.png'),
    require('./assets/e3@2x.png'),
    require('./assets/e4@2x.png'),
    require('./assets/e5@2x.png')
  ]
  return (
    <Section>
      <Container>
        <Heading
          textAlign='center'
          mb={6}
        >车辆置换
        </Heading>
        <Columns breakpoint='mobile' justifyContent='center'>
          {
            steps.map((step, index) => (
              <Columns.Column
                key={index}
                className={classnames(exchangeStyle.stepCol, 'is-narrow-mobile')}
              >
                <Element className={exchangeStyle.step}>
                  <img src={icons[index]} alt='' />
                  <Content className={exchangeStyle.content} mt={2}>
                    <strong>{step[0]}</strong>
                    <span dangerouslySetInnerHTML={{
                      __html: step[1]
                    }}
                    />
                  </Content>
                </Element>
              </Columns.Column>
            ))
          }
        </Columns>
      </Container>
    </Section>
  )
}
export default Exchange
