import React from 'react'
import Page from 'components/Page'
import Brand from 'components/Modules/Brand'
const AboutPage = () => {
  const pageProps = {
    heroProps: {
      cover: '/banner/about@2x.jpg',
      title: '认证二手车品牌介绍'
    },
    breadcrumbs: [
      { title: '认证二手车品牌介绍' }
    ]
  }
  return (
    <Page
      {...pageProps}
    >
      <Brand />
    </Page>
  )
}
export default AboutPage
