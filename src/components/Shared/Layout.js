import React, {
  useEffect
} from 'react'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import NextHead from 'next/head'
import {
  useRouter
} from 'next/router'
import {
  useSelector
} from 'react-redux'
import Loading from 'components/Loading'
import WechatJSSDK from 'wechat-jssdk'
/* eslint-disable react/prop-types */
const Layout = ({
  children
}) => {
  const router = useRouter()
  const {
    reload,
    asPath
  } = router
  const {
    loading = true,
    error = {}
  } = useSelector(({
    ui: { loading, error } = {}
  }) => ({ loading, error }))

  useEffect(async () => {
    // eslint-disable-next-line no-undef
    const response = await fetch(`/api/jssdk?url=${window.location}`)
    const wechatConfig = await response.json()
    const wechatObj = new WechatJSSDK(wechatConfig)
    wechatObj.initialize()
    wechatObj.callWechatApi('updateAppMessageShareData', {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || '',
      link: window.location,
      imgUrl: require('assets/warranty-logo.png')
    })
  }, [asPath])
  return (
    <>
      <NextHead>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no' />
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <title>上汽认证二手车</title>
      </NextHead>
      <Nav />
      <main className='main'>
        {
          (loading || error) && (
            <Loading>
              {
                error &&
                error.networkError &&
                (
                  <div>
                    <span>网络错误，</span>
                    <span onClick={reload}>点击重新加载</span>
                  </div>
                )
              }
            </Loading>
          )
        }
        {children}
      </main>
      <Footer />
    </>
  )
}
export default Layout
