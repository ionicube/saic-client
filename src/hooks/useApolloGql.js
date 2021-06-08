import {
  useEffect
} from 'react'
import { useDispatch } from 'react-redux'
import {
  parser,
  DocumentType,
  useQuery,
  useMutation,
  useSubscription
} from '@apollo/client'
import {
  hasError,
  hideLoading,
  showLoading
} from 'store/ui/actions'
import merge from 'deepmerge'
import usePreviousNonNullish from './usePreviousNonNullish'
const useApolloGql = (
  document,
  gqlOptions = {},
  dispatchLoading = true) => {
  const graphQL = ((type) => {
    switch (type) {
      case DocumentType.Mutation:
        return useMutation
      case DocumentType.Subscription:
        return useSubscription
      case DocumentType.Query:
      default:
        return useQuery
    }
  })(parser(document).type)
  const defaultGqlOptions = {
    errorPolicy: 'ignore'
  }
  const {
    loading,
    error,
    data,
    ...rest
  } = graphQL(document, merge(defaultGqlOptions, gqlOptions))
  const dispatch = useDispatch()
  useEffect(() => {
    // https://reactjs.org/blog/2020/02/26/react-v16.13.0.html#warnings-for-some-updates-during-render
    dispatchLoading && dispatch((loading ? showLoading : hideLoading)())
    if (error) dispatch(hasError(error))
  })
  const prevData = usePreviousNonNullish(data)
  return {
    loading,
    error,
    data: data ?? prevData,
    ...rest
  }
}
export default useApolloGql
