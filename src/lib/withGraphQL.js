import React from 'react'
import PropTypes from 'prop-types'
import useApolloGql from 'hooks/useApolloGql'
import hoistNonReactStatic from 'hoist-non-react-statics'

export default function withGraphQL (
  document,
  mapProps,
  dispatchLoading = false,
  passDownGqlOptions = false
) {
  return Component => {
    const withGraphQL = ({
      gqlOptions = {},
      ...restProps
    }) => {
      const {
        loading,
        error,
        data
      } = useApolloGql(document, gqlOptions, dispatchLoading)
      const componetExtralProps = passDownGqlOptions ? { gqlOptions } : {}
      return (
        <>
          {
            data && (
              <Component
                {...(typeof mapProps === 'function'
                  ? mapProps({
                    ...data, error, loading
                  }, gqlOptions)
                  : data)
                }
                {...componetExtralProps}
                {...restProps}
              />
            )
          }
        </>
      )
    }
    if (process.env.NODE_ENV !== 'production') {
      const displayName = Component.displayName || Component.name || 'Component'
      withGraphQL.displayName = `withGraphQL(${displayName})`
    }
    withGraphQL.propTypes = {
      gqlOptions: PropTypes.object
    }
    return hoistNonReactStatic(withGraphQL, Component)
  }
}
