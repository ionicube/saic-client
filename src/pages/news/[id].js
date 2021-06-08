import React from 'react'
import { useRouter } from 'next/router'
import NewsDetail from 'components/Modules/News/Detail'
const NewsPage = () => {
  const router = useRouter()
  const {
    query: { id }
  } = router
  return (
    <NewsDetail id={id} />
  )
}
export default NewsPage
