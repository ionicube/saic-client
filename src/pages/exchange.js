import React from 'react'
import Page from 'components/Page'
import Exchange from 'components/Modules/Exchange'
import ExchangeContact from 'components/Modules/Contact/ExchangeContact'
const ExchangePage = () => {
  const pageProps = {
    heroProps: {
      cover: '/banner/exchange@2x.jpg',
      title: '车辆置换'
    },
    breadcrumbs: [
      { title: '车辆置换' }
    ]
  }
  return (
    <Page
      {...pageProps}
    >
      <Exchange />
      <ExchangeContact
        title='留下自己的信息'
        subtitle='上汽乘用车品牌或其他汽车品牌置换意向均可在此留下您的个人信息，我们将尽快与您取得联系，提供评估置换等服务。'
      />
    </Page>
  )
}
export default ExchangePage
