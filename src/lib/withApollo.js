import React from 'react'
import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import {
  useApollo,
  initializeApollo
} from 'lib/apolloClient'

const routeSSGEnabledMap = {
  '/[[...slug]]': process.env.NODE_ENV === 'production'
}
export default function withApollo (Component, { ssr = true } = {}) {
  /* eslint-disable react/prop-types */
  const WithApollo = ({ apolloClient, ssrApolloState, ...restProps }) => {
    const {
      pageProps: {
        ssgApolloState
      } = {}
    } = restProps
    const client = apolloClient || useApollo(ssrApolloState ?? ssgApolloState)
    return (
      <ApolloProvider client={client}>
        <Component {...restProps} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = Component.displayName || Component.name || 'Component'
    WithApollo.displayName = `withApollo(${displayName})`
  }
  if (ssr || Component.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const {
        AppTree,
        router: {
          pathname
        }
      } = ctx
      const apolloClient = (ctx.apolloClient = initializeApollo())

      // Run wrapped getInitialProps methods
      let componentProps = {}
      if (Component.getInitialProps) {
        componentProps = await Component.getInitialProps(ctx)
      }
      if (routeSSGEnabledMap[pathname]) return componentProps
      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.writableEnded) {
          return componentProps
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/client/react/ssr')
            await getDataFromTree(
              <AppTree
                {...componentProps}
                apolloClient={apolloClient}
              />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }

      // Extract query data from the Apollo store
      const ssrApolloState = apolloClient.cache.extract(false)
      return {
        ...componentProps,
        ssrApolloState
      }
    }
  }
  return WithApollo
}
