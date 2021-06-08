import Link from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import navStyle from './Nav.module.scss'

const NavLinkItem = ({
  href,
  children,
  isActivable,
  className,
  isDefault = false,
  ...restProps
}) => {
  const {
    asPath = ''
  } = useRouter()
  const isCSR = !!process.browser
  const shouldActive = asPath === '/'
    ? isDefault
    : (
        href === asPath || (
          (href !== '/') && (
            (isCSR) && asPath.includes('#')
            // ignore asPath hash, this will cause the SSR is different from SCR
              ? asPath.substr(0, asPath.indexOf('#'))
              : asPath
          ).startsWith(href)
        )
      )
  const isActive = isActivable && shouldActive
  return (
    <Link
      href={href}
      passHref
    >
      <a
        {...restProps}
        className={classNames(
          'navbar-item',
          navStyle.item,
          className,
          {
            'is-active': isActive
          }
        )}
      >
        {children}
      </a>
    </Link>
  )
}
NavLinkItem.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  isActivable: PropTypes.bool,
  className: PropTypes.string,
  isDefault: PropTypes.bool
}
NavLinkItem.defaultProps = {
  isActivable: true
}
export default NavLinkItem
