import React from 'react'
import { useRouter } from 'next/router'
import Page from 'components/Page'
import CarsList from 'components/Modules/Vehicles'
const Buy = () => {
  const pageProps = {
    heroProps: {
      cover: '/banner/buy@2x.jpg',
      title: '车辆搜索',
      autoHieght: true,
      centered: true
    },
    breadcrumbs: [
      { title: '我要买车' }
    ]
  }
  const router = useRouter()
  const {
    query: {
      p: page = 1,
      org
    }
  } = router
  const paginationChange = (page) => {
    const query = {
      p: page
    }
    if (org) {
      query.org = org
    }
    router.push({
      pathname: '/buy',
      query
    }, undefined, { scroll: false })
  }
  return (
    <Page
      {...pageProps}
    >
      <CarsList
        paginationChange={paginationChange}
        page={Number(page)}
        size={20}
        org={org}
      />
    </Page>
  )
}
export default Buy
