import React, {
  useState,
  useEffect
} from 'react'
import { useDispatch } from 'react-redux'
import {
  hasError,
  hideLoading,
  showLoading
} from 'store/ui/actions'

const withFormSubmit = Component => {
  return (props) => {
    const [
      result,
      setResult
    ] = useState(true)
    const [
      error,
      setError
    ] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
      if (error) {
        dispatch(hasError(error))
      } else {
        dispatch((!result ? showLoading : hideLoading)())
      }
    }, [result, error])
    const formUrl = process.env.NODE_ENV === 'development' ? 'https://form-test.modix.cn/form.php' : 'https://form.modix.cn/form.php'
    const onSubmit = async (form) => {
      setResult(null)
      try {
        // eslint-disable-next-line no-undef
        const response = await fetch(formUrl, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          mode: 'no-cors',
          body: JSON.stringify({
            source: 'website',
            ...form
          })
        })
        const {
          ok,
          type,
          statusText
        } = response;
        (ok || type === 'opaque') ? setResult(response) : setError(statusText)
      } catch (e) {
        setError(e)
      }
    }
    return (
      <Component
        onSubmit={onSubmit}
        result={result}
        {...props}
      />
    )
  }
}
export default withFormSubmit
