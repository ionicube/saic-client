import React from 'react'
import {
  Section,
  Container
} from 'react-bulma-components'
import Link from 'next/link'
import classnames from 'classnames'
import bcStyle from './Bc.module.scss'
import { audit } from 'rxjs/operators'
/* eslint-disable react/prop-types */
const Breadcrumb = ({
  breadcrumbs = [],
  back,
  ...rest
}) => {
  return (
    <Section className={classnames(bcStyle.section)} {...rest}>
      <Container>
        <nav className={classnames('breadcrumb', bcStyle.breadcrumb)} aria-label='breadcrumbs'>
          <ul>
            <li>
              <Link
                href='/'
                passHref
              >
                <a>首页</a>
              </Link>
            </li>
            {
              breadcrumbs.map(({ title, href }, index) => {
                return (
                  <React.Fragment key={index}>
                    {
                      href
                        ? (
                          <li>
                            <Link
                              href={href}
                              passHref
                            >
                              <a>{title}</a>
                            </Link>
                          </li>
                          )
                        : (
                            title && (
                              <li className='is-active'>
                                <a>{title}</a>
                              </li>
                            )
                          )
                    }
                  </React.Fragment>
                )
              })
            }
            {
              back && (
                <li
                  className={bcStyle.back}
                  style={{ marginLeft: 'auto' }}>
                  <Link
                    href={back.href}
                    passHref
                  >
                    <a>{back.title}</a>
                  </Link>
                </li>
              )
            }
          </ul>
        </nav>

      </Container>
    </Section>
  )
}
export default Breadcrumb
