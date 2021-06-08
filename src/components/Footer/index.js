import React from 'react'
import {
  Footer as RBCFooter,
  Container,
  Columns,
  Heading,
  Content,
  Block
} from 'react-bulma-components'
import footerStyle from './Footer.module.scss'

const Footer = () => {
  const footerLinks = {
    购车助手: [
      ['预约试驾', 'https://www.roewe.com.cn/purchase/test-drive.html'],
      ['金融计算器', 'https://m.haocheedai.com/saicmotor/activityProduct.html?brandCode=ROEWE'],
      ['经销商查询', 'https://www.roewe.com.cn/purchase/dealer-search.html'],
      ['商城', 'https://roewe.tmall.com/']
    ],
    全系车型: [
      ['iMAX8', 'https://www.roewe.com.cn/mpv/roeweimax8/'],
      ['RX8', 'https://www.roewe.com.cn/vehicles/roewerx8/'],
      ['RX5 PLUS', 'https://www.roewe.com.cn/vehicles/roewerx5plus/'],
      ['RX5 MAX', 'https://www.roewe.com.cn/vehicles/roewerx5max/'],
      ['RX5', 'https://www.roewe.com.cn/vehicles/roewerx5/'],
      ['RX3 PRO', 'https://www.roewe.com.cn/vehicles/roewerx3pro/'],
      ['i6 MAX', 'https://www.roewe.com.cn/vehicles/roewei6MAX/'],
      ['i6 PLUS', 'https://www.roewe.com.cn/vehicles/roewei6PLUS/'],
      ['i5', 'https://www.roewe.com.cn/vehicles/roewei5/'],
      ['全新i5', 'https://www.roewe.com.cn/vehicles/roewei5new/']
    ],
    新能源动力车型: [
      ['ERX5', 'https://www.roewe.com.cn/Netgreen/roewecerx5/'],
      ['Ei5', 'https://www.roewe.com.cn/Netgreen/roeweei5/'],
      ['RX5 eMAX', 'https://www.roewe.com.cn/vehicles/roewerx5emax/'],
      ['RX5 ePLUS', 'https://www.roewe.com.cn/vehicles/roewerx5plus/'],
      ['ei6 MAX', 'https://www.roewe.com.cn/vehicles/roewei6MAX/'],
      ['ei6 PLUS', 'https://www.roewe.com.cn/vehicles/roewei6PLUS/'],
      ['MARVEL X', 'https://www.roewe.com.cn/marvel/'],
      ['CLEVER', 'https://www.roewe.com.cn/vehicles/clever/']
    ],
    关于荣威: [
      ['品牌故事', 'https://www.roewe.com.cn/brand/brandinfo.html'],
      ['新闻资讯', 'https://www.roewe.com.cn/about-us/news&activity/'],
      ['市场活动', 'https://www.roewe.com.cn/about-us/news&activity/?param=activity'],
      ['服务理念', 'https://www.roewe.com.cn/brand/notion/notion.html']
    ]
  }
  return (
    <RBCFooter
      pb={4}
      backgroundColor='light'
      className={footerStyle.footer}
    >
      <Container>
        <Block>
          <Columns className={footerStyle.navs}>
            {
              Object.keys(footerLinks).map((heading, index) => {
                return (
                  <Columns.Column
                    tablet={{ size: 6 }}
                    desktop={{ size: 3 }}
                    key={index}
                  >
                    <Heading size={5} mb={2}>{heading}</Heading>
                    <ul className={footerStyle.links}>
                      {
                        footerLinks[heading].map(([title, href], key) => (
                          <li key={key}>
                            <a
                              href={href}
                              target='_blank'
                              rel='noreferrer'
                            >{title}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  </Columns.Column>
                )
              })
            }
          </Columns>
        </Block>
        <Block>
          <Columns
            justifyContent='center'
            breakpoint='mobile'
            gap={6}
            className={footerStyle.qrcodes}
          >
            <Columns.Column narrow>
              <Content textAlign='center'>
                <Heading size={6} mb={3}>
                  上汽认证二手车微信公众号
                </Heading>
                <img
                  src={require('./assets/wechat.jpg')} alt=''
                />
              </Content>
            </Columns.Column>
            <Columns.Column narrow>
              <Content textAlign='center'>
                <Heading size={6} mb={3}>
                  上汽认证二手车微信小程序
                </Heading>
                <img
                  src={require('./assets/mp.png')} alt=''
                />
              </Content>
            </Columns.Column>
            <Columns.Column narrow>
              <Content textAlign='center'>
                <Heading size={6} mb={3}>
                  上汽认证二手车抖音号
                </Heading>
                <img
                  src={require('./assets/dy.png')} alt=''
                />
              </Content>
            </Columns.Column>
          </Columns>
        </Block>
        <Content
          textAlign='center'
          className={footerStyle.copy}
        >
          <span>上海汽车© 2018上汽集团版权所有</span>
          <a
            href='https://beian.miit.gov.cn/'
            target='_blank'
            rel='noreferrer'
          >
            沪ICP备09093484号-4
          </a>
          <a
            href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011402001222'
            target='_blank'
            rel='noreferrer'
          >
            沪公网安备31011402001222号
          </a>
        </Content>
      </Container>
    </RBCFooter>
  )
}
export default Footer
