import React from 'react'
import NextApp from 'next/app'
import { Provider as ReduxProvider } from 'react-redux'
import { useStore } from 'store'
import { SWRConfig } from 'swr'
import Layout from 'components/Shared/Layout'
import withApollo from 'lib/withApollo'
// import 'lib/elementFix'
import 'sass/global.scss'

/* eslint-disable react/prop-types */
const App = ({
  Component,
  pageProps = {}
}) => {
  const {
    initialReduxState
  } = pageProps
  const store = useStore(initialReduxState)
  const swrOptions = {}
  return (
    <ReduxProvider store={store}>
      <SWRConfig value={swrOptions}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </ReduxProvider>
  )
}
App.getInitialProps = async (context) => {
  const appProps = await NextApp.getInitialProps(context)
  return {
    ...appProps
  }
}
export default withApollo(App)
