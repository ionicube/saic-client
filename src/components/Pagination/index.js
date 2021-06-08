import RCPagination from 'rc-pagination'
import Button from 'components/Button'
import React from 'react'
import classnames from 'classnames'
import paginationStyle from './Pagination.module.scss'
/* eslint-disable react/prop-types */
const Pagination = ({
  current: page,
  ...rest
}) => {
  const itemRender = (current, type, element) => {
    switch (type) {
      case 'page':
        return (
          <Button
            color='primary'
            outlined={page !== current}
          ><span>{current}</span>
          </Button>
        )
      case 'prev':
        return (
          <Button
            color='primary'
            outlined
          ><span>上一页</span>
          </Button>
        )
      case 'next':
        return (
          <Button
            color='primary'
            outlined
          ><span>下一页</span>
          </Button>
        )
      case 'jump-prev':
      case 'jump-next':
        return (<span className='pagination-ellipsis'>...</span>)
      default:
        return null
    }
  }
  return (
    <nav
      className={classnames('pagination', 'is-centered', 'mt-5', paginationStyle.nav)}
      aria-label='pagination'
    >
      <RCPagination
        className={classnames('pagination-list')}
        itemRender={itemRender}
        hideOnSinglePage
        {...rest}
      />
    </nav>
  )
}
export default Pagination
