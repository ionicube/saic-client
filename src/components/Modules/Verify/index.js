import React from 'react'
import {
  Section,
  Container,
  Columns,
  Element,
  Heading,
  Content
} from 'react-bulma-components'
import verifyStyle from './Verify.module.scss'
const Verify = () => {
  const steps = [
    '购车 & 签订 <br />保值回购协议',
    '用户申请回购&<br />确认新车意向（到期前30天确认）',
    '与认证二手车中心<br />确认回购金额',
    '用户换购新车<br />（新认证二手车或新车）',
    '完成旧车<br />交易办证'
  ]
  return (
    <Section>
      <Container>
        <Heading
          mb={6}
        >上汽认证二手车
        </Heading>
        <Content className={verifyStyle.content}>
          <p>上汽认证二手车，负责上汽集团旗下的荣威与名爵的二手车保值回购，甄选优质车源，展开检测、整备、认证、零售等保值营销服务。我们致力 以“保证、信任、可靠、透明”的品牌理念，严格按照354项高标准检测让每一辆上汽二手车都犹如新生，且享有原厂质量保证。</p>
          <Heading renderAs='h5' size={6} textWeight='medium'>上汽认证二手车，是每一辆上汽二手车交易焕新的承诺，更是购买上汽二手车的不二之选。</Heading>
          <Element mt={6}>
            <Columns>
              <Columns.Column size={6}>
                <Element>
                  <img src={require('./assets/v1@2x.png')} alt='' />
                </Element>
              </Columns.Column>
              <Columns.Column size={6}>
                <Content>
                  <Heading renderAs='h5' size={5}>1.原厂质保</Heading>
                  <Heading renderAs='h6' size={6} textWeight='medium' subtitle>在任意一家上汽授权的经销商门店，免费享受等同新车的整车质保服务（不含易损件）。认证二手车质保生效时间以认证审核通过之日起生效</Heading>
                  <p>整车质保：新车质保基础上增加1年/30,000公里（以先到为准）<br />
                    电池电芯：新车质保基础上增加5万公里（以先到为准）<br />
                    如在新车质保期外：认证二手车提交预认证之日起1年/30,000公里（以先到为准）<br />
                    质保范围：<br />
                    ①认证二手车质保范围与与原厂整车保修范围基本一致，但不包括《维修保养手册》及《三包凭证》中列出的易损耗件，如：润滑油、机油和滤清器、空气和空调滤清器、制动衬片、灯泡、轮胎的正常磨损、12V蓄电池、雨刮片等。<br />
                    ②用于营运或公共服务的认证二手车将无法享受认证车的质保服务，包括但不限于出租车、警车、消防车、救护车、工程抢险等；
                  </p>
                </Content>
              </Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column size={6}>
                <Content>
                  <Heading renderAs='h5' size={5}>2.终身免费基础保养</Heading>
                  <Heading renderAs='h6' size={6} textWeight='medium' subtitle>每一辆上汽认证二手车尊享认证中心提供的终身免费基础保养</Heading>
                  <p>基础保养内容：发动机机油、空滤、机油滤清器的更换；<br />
                    基础保养周期：每1万公里/6个月，以先到者为准；<br />
                    基础保养服务网点：上汽授权认证二手车中心及其合作网点（集团下品牌店、中心合作4S店）；<br />
                    基础保养费用：认证中心承担基础保养材料费用，工时费用由客户承担；<br />
                    基础保养适用对象：<br />
                    ①上汽认证二手车的首任车主及购买的上汽认证二手车，权益与车主本人和车辆一对一绑定，车辆一经转让出售，权益自动失效；<br />
                    ②终身免费基础保养权益仅适用于非营运车辆，车辆用于营运、非法经营或公共服务，包括但不限于出租车、警车、工程抢险、各类专车、网约车等，权益自动失效；
                  </p>
                </Content>
              </Columns.Column>
              <Columns.Column size={6}>
                <Element>
                  <img src={require('./assets/v2@2x.png')} alt='' />
                </Element>
              </Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column size={6}>
                <Element>
                  <img src={require('./assets/v3@2x.png')} alt='' />
                </Element>
              </Columns.Column>
              <Columns.Column size={6}>
                <Content>
                  <Heading renderAs='h5' size={5}>3.保值回购</Heading>
                  <Heading renderAs='h6' size={6} textWeight='medium' subtitle>上汽认证中心根据车辆残值走势设定回购标准，高价回购每一辆上汽认证二手车，让您的爱车更保值，年年开新车；</Heading>
                  <p>保值回购价格：认证中心与客户约定保值回购价格（销售开票价的xx折扣）；<br />
                    保值回购期限：开票之日起12个自然月内；<br />
                    保值回购款项：回购价款用以抵扣换购认证中心认证二手车或者新车的款项；<br />
                    保值回购车辆标准：车辆需满足回购标准，详见《上汽认证二手车回购协议》附件《回购标准》；<br />
                    保值回购适用对象：<br />
                    ①上汽认证二手车的首任车主及购买的上汽认证二手车，权益与车主本人和车辆一对一绑定，车辆一经转让出售，权益自动失效；<br />
                    ②终身免费基础保养权益仅适用于非营运车辆，车辆用于营运、非法经营或公共服务，包括但不限于出租车、警车、工程抢险、各类专车、网约车等，权益自动失效；<br />
                    保值回购流程：简化回购流程如下
                  </p>
                </Content>
              </Columns.Column>
            </Columns>
            <Element className={verifyStyle.steps}>
              {
                steps.map((step, index) => {
                  return (
                    <React.Fragment key={index}>
                      {
                        index > 0 && (
                          <Element className={verifyStyle.arrow}>
                            <img src={require('./assets/arrow@2x.png')} alt='' />
                          </Element>
                        )
                      }
                      <Element
                        className={verifyStyle.step}
                      >
                        <span dangerouslySetInnerHTML={{
                          __html: step
                        }}
                        />
                      </Element>
                    </React.Fragment>
                  )
                })
              }
            </Element>
          </Element>
        </Content>
      </Container>
    </Section>
  )
}
export default Verify
