import React from 'react'
import {
  Section,
  Container,
  Columns,
  Element,
  Image, Heading, Content,
  Block
} from 'react-bulma-components'
import ReactPlayer from 'react-player'
import BrandStyle from './Brand.module.scss'
const Brand = () => {
  return (
    <Section className={BrandStyle.section}>
      <Container>
        <Heading
          mb={6}
        >上汽认证二手车
        </Heading>
        <Content>
          <p>
            建立上汽认证二手车中心体系，进行上汽集团旗下的荣威、名爵、R汽车的二手车保值回购，甄选优质车源，展开检测、整备、认证、零售等保值营销服务。我们致力以“保
            证、信任、可靠、透明”的品牌理念，严格按照354项高标准检测，让每一辆上汽二手车都犹如新生，且享有原厂质量保证。
          </p>
          <Heading renderAs='h5' size={6} textWeight='medium'>上汽认证二手车，是每一辆上汽二手车交易焕新的承诺，更是购买上汽二手车的不二之选。</Heading>
        </Content>
        <Block>
          <figure className='image is-16by9'>
            <ReactPlayer
              url='/about.mp4'
              className='has-ratio'
              width='auto'
              height='auto'
              controls
            />

          </figure>
        </Block>
        <Element
          my={6} py={6}
          className='separator'
        >
          <Heading
            mb={6}
            textAlign='center'
          >品牌优势
          </Heading>
          <Columns>
            <Columns.Column size={6}>
              <Element>
                <img src={require('./assets/b1@2x.jpg')} alt='' />
              </Element>
            </Columns.Column>
            <Columns.Column size={6}>
              <Content>
                <Heading renderAs='h5' size={5}>1.甄选车源，放心!</Heading>
                <p>优品承诺，只选5年/10万公里次新车。 车龄不超过5年，且行驶里程不超过10万公里；拒收营运车、改装车、杜绝事故、泡水、火烧车</p>
              </Content>
            </Columns.Column>
          </Columns>
          <Columns>
            <Columns.Column size={6}>
              <Content>
                <Heading renderAs='h5' size={5}>2.原厂认证，安心！</Heading>
                <p>354项认证检测，值得信赖。每一台车均经过上汽认证的354项严格检查，一车一况，车况历史数据等资料高度透明，清晰且便捷可查</p>
              </Content>
            </Columns.Column>
            <Columns.Column size={6}>
              <Element>
                <img src={require('./assets/b2@2x.jpg')} alt='' />
              </Element>
            </Columns.Column>
          </Columns>

          <Columns>
            <Columns.Column size={6}>
              <Element>
                <img src={require('./assets/b3@2x.jpg')} alt='' />
              </Element>
            </Columns.Column>
            <Columns.Column size={6}>
              <Content>
                <Heading renderAs='h5' size={5}>3.服务如新，贴心！</Heading>
                <p>
                  1年原厂质保，终身免费基础保养 <br />
                  1年3万公里原厂质保；<br />
                  在任意一家上汽授权的经销商门店，均享受原厂配件与等同新车的质保服务<br />
                  试驾、验车、交车的购车过程，同享购买新车的星级服务标准<br />
                  额外获享1次保养焕新服务，包括空滤、机滤的更换，全车杀毒服务<br />
                  在上汽认证的二手车中心，尊享终身免费基础保养服务
                </p>
              </Content>
            </Columns.Column>
          </Columns>
          <Columns>
            <Columns.Column size={6}>
              <Content>
                <Heading renderAs='h5' size={5}>4.上乘交易，舒心</Heading>
                <p>
                  高价保值回购，当天到账<br />
                  上汽车主享有全网最优竞争力的收车价格<br />
                  售车交易额，当天到账<br />
                  认证中心设定回购标准，上汽认证二手车高保值率保障，年年开新车
                </p>
              </Content>
            </Columns.Column>
            <Columns.Column size={6}>
              <Element>
                <img src={require('./assets/b4@2x.jpg')} alt='' />
              </Element>
            </Columns.Column>
          </Columns>
        </Element>

        <Element
          my={6} py={6}
          className='separator'
        >
          <Heading
            mb={6}
            textAlign='center'
          >用户权益
          </Heading>
          <Columns>
            <Columns.Column size={6}>
              <Element>
                <img src={require('./assets/r1@2x.jpg')} alt='' />
              </Element>
            </Columns.Column>
            <Columns.Column size={6}>
              <Content>
                <Heading renderAs='h5' size={5}>1.原厂质保</Heading>
                <Heading renderAs='h6' size={6} textWeight='medium' subtitle>在任意一家上汽授权的经销商门店，免费享受等同新车的整车质保服务（不含易损件）。认证二手车质保生效时间以认证审核通过之日起生效</Heading>
                <p>
                  整车质保：新车质保基础上增加1年/30,000公里（以先到为准）<br />
                  电池电芯：新车质保基础上增加5万公里（以先到为准）<br />
                  如在新车质保期外：认证二手车提交预认证之日起1年/30,000公里（以先到为准）
                </p>
              </Content>
            </Columns.Column>
          </Columns>
          <Columns>
            <Columns.Column size={6}>
              <Content>
                <Heading renderAs='h5' size={5}>2.终身免费基础保养</Heading>
                <Heading renderAs='h6' size={6} textWeight='medium' subtitle>每一辆上汽认证二手车尊享认证中心提供的终身免费基础保养</Heading>
                <p>
                  基础保养内容：发动机机油、空滤、机油滤清器的更换；<br />
                  基础保养周期：每1万公里/6个月，以先到者为准；<br />
                  基础保养服务网点：上汽授权认证二手车中心及其合作网点（集团下品牌店、中心合作4S店）；<br />
                  基础保养费用：认证中心承担基础保养材料费用，工时费用由客户承担；
                </p>
              </Content>
            </Columns.Column>
            <Columns.Column size={6}>
              <Element>
                <img src={require('./assets/r2@2x.jpg')} alt='' />
              </Element>
            </Columns.Column>
          </Columns>

          <Columns>
            <Columns.Column size={6}>
              <Element>
                <img src={require('./assets/r3@2x.jpg')} alt='' />
              </Element>
            </Columns.Column>
            <Columns.Column size={6}>
              <Content>
                <Heading renderAs='h5' size={5}>3.保值回购</Heading>
                <Heading renderAs='h6' size={6} textWeight='medium' subtitle>上汽认证中心根据车辆残值走势设定回购标准，高价回购每一辆上汽认证二手车，让您的爱车更保值，年年开新车；</Heading>
                <p>
                  保值回购价格：认证中心与客户约定保值回购价格（销售开票价的xx折扣）；<br />
                  保值回购期限：开票之日起12个自然月内；<br />
                  保值回购款项：回购价款用以抵扣换购认证中心认证二手车或者新车的款项；
                </p>
              </Content>
            </Columns.Column>
          </Columns>
        </Element>
      </Container>
    </Section>
  )
}
export default Brand
