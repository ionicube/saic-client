import React from 'react'
import Page from 'components/Page'
import Sell from 'components/Modules/Sell'
import SellContact from 'components/Modules/Contact'
const SellPage = () => {
  const pageProps = {
    heroProps: {
      cover: '/banner/sell@2x.jpg',
      title: '我要卖车'
    },
    breadcrumbs: [
      { title: '我要卖车' }
    ]
  }
  return (
    <Page
      {...pageProps}
    >
      <Sell />
      <SellContact
        title='联系我们'
        subtitle='请留下您的联系方式，我们将尽快与您取得联系，为您提供该车的销售信息。'
      />
    </Page>
  )
}
export default SellPage
