import {
  useEffect,
  useRef
} from 'react'
const usePreviousNonNullish = (value) => {
  const ref = useRef(value)
  useEffect(() => {
    if (value !== null && value !== undefined) {
      ref.current = value
    }
  })
  return ref.current
}
export default usePreviousNonNullish
