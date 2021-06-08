import React from 'react'
import Enquiry from 'components/Enquiry'
import LatestVehicle from 'components/Modules/LatestVehicle'
import Intro from 'components/Modules/Intro'
import Page from 'components/Page'
import News from 'components/Modules/News'
import Faq from 'components/Modules/Faq'
const Home = () => {
  const pageProps = {
    heroProps: {
      cover: '/banner/home@2x.jpg',
      children: <Enquiry />,
      autoHieght: true
    }
  }
  return (
    <Page
      {...pageProps}
    >
      <News />
      <LatestVehicle />
      <Intro />
      <Faq />
    </Page>
  )
}
export default Home
