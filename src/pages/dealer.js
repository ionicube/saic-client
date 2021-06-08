import React from 'react'
import Page from 'components/Page'
import Dealer from 'components/Modules/Dealer'
const DealerPage = () => {
  const pageProps = {
    heroProps: {
      cover: '/banner/dealer@2x.jpg',
      title: '上汽认证中心查找'
    },
    breadcrumbs: [
      { title: '上汽认证中心查找' }
    ]
  }
  return (
    <Page
      {...pageProps}
    >
      <Dealer />
    </Page>
  )
}
export default DealerPage
