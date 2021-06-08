import React from 'react'
import Page from 'components/Page'
import Verify from 'components/Modules/Verify'
const VerifyPage = () => {
  const pageProps = {
    heroProps: {
      cover: '/banner/verify@2x.jpg',
      title: '上汽认证二手车'
    },
    breadcrumbs: [
      { title: '上汽认证二手车' }
    ]
  }
  return (
    <Page
      {...pageProps}
    >
      <Verify />
    </Page>
  )
}
export default VerifyPage
