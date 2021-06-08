import React from 'react'
import {
  Section,
  Container,
  Columns,
  Element,
  Image, Heading, Content
} from 'react-bulma-components'
const Sell = () => {
  return (
    <Section>
      <Container>
        <Heading
          textAlign='center'
          mb={6}
        >上乘交易，舒心！
        </Heading>
        <Columns>
          <Columns.Column size={6}>
            <Element
              display='relative'
            >
              <Image
                src={require('./assets/s@2x.png')}
                size='4by3'
              />
            </Element>
          </Columns.Column>
          <Columns.Column size={6}>
            <Content>
              <Heading renderAs='h5' size={5}>高价保值回购，<span style={{ color: '#EE7203' }}>当</span>天到账</Heading>
              <p>上汽车主享有全网最优竞争力的收车价格 <br />
                售车交易额，当天到账 <br />
                认证中心设定回购标准，上汽认证二手车高保值率保障，年年开新车。
              </p>
            </Content>
          </Columns.Column>
        </Columns>
      </Container>
    </Section>
  )
}
export default Sell
