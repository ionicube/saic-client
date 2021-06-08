import React from 'react'
import {
  Section,
  Container,
  Heading,
  Content,
  Columns,
  Element
} from 'react-bulma-components'
import Button from 'components/Button'
import Image from 'next/image'
import Link from 'next/link'
import introStyle from './Intro.module.scss'
const Intro = () => {
  const advs = [
    '5年优选车龄',
    '10万公里次新车',
    '354项认证检测',
    '1年3万公里原厂质保',
    '高价保值回购',
    '终身免费基础保养'
  ]

  const advIcons = [
    require('./assets/a1.png'),
    require('./assets/a2.png'),
    require('./assets/a3.png'),
    require('./assets/a4.png'),
    require('./assets/a5.png'),
    require('./assets/a6.png')
  ]
  return (
    <Section className={introStyle.section}>
      <Container>
        <Heading
          textAlign='center'
          mb={6}
        >什么是上汽认证二手车？
        </Heading>
        <Columns breakpoint='desktop'>
          <Columns.Column
            tablet={{ size: 12 }}
            desktop={{ size: 7 }}
          >
            <Content className={introStyle.content}>
              <Heading renderAs='h4' size={5}>
                上汽认证二手车，是每一辆上汽二手车交易焕新的承诺，更是购买上汽二手车的不二之选。
              </Heading>
              <p>建立上汽认证二手车中心体系，进行上汽集团旗下的荣威、名爵、R汽车的二手车保值回购，
                甄选优质车源，展开检测、整备、认证、零售等保值营销服务。
                我们致力以“保证、信任、可靠、透明”的品牌理念，严格按照354项高标准检测，
                让每一辆上汽二手车都犹如新生，且享有原厂质量保证。
              </p>
              <ul className={introStyle.list}>
                <li>甄选车源，放心！</li>
                <li>原厂认证，安心！</li>
                <li>服务如新，贴心！</li>
                <li>上乘交易，舒心！</li>
              </ul>
            </Content>
          </Columns.Column>
          <Columns.Column
            tablet={{ size: 12 }}
            desktop={{ size: 4, offset: 1 }}
          >
            <Element className={introStyle.r}>
              <div className={introStyle.logo}>
                <img
                  src={require('assets/warranty-logo.png')}
                  alt=''
                />
              </div>
              <Link
                href='/about' passHref>
                <Button
                  color='dark'
                ><span>上汽认证二手车权益详情</span>
                </Button>
              </Link>
            </Element>
          </Columns.Column>
        </Columns>
      </Container>
      <Section
        className={introStyle.ws}
        mt={6}
      >
        <Image
          src={require('./assets/banner@2x.png')}
          layout='fill'
          objectFit='cover'
          objectPosition='top center'
        />
        <Container>
          <Columns
            breakpoint='mobile'
            justifyContent='center'
          >
            {
              advs.map((adv, index) => (
                <Columns.Column
                  className={introStyle.wsColumn}
                  key={index}
                  mobile={{
                    size: 6
                  }}
                >
                  <div className={introStyle.adv}>
                    <img
                      className={introStyle.icon}
                      src={advIcons[index]}
                      alt=''
                    />
                    <Heading
                      renderAs='h5'
                      textColor='white'
                      size={5}
                      mt={4}
                    >{adv}
                    </Heading>
                  </div>
                </Columns.Column>
              ))
            }
          </Columns>
        </Container>
      </Section>
    </Section>
  )
}
export default Intro
