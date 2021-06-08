import React, {
  useState
} from 'react'
import {
  Container,
  Navbar
} from 'react-bulma-components'
import classnames from 'classnames'
import NavLinkItem from './NavLinkItem'
import navStyle from './Nav.module.scss'
const Nav = () => {
  const [navbarMenuActive, setnavbarMenuActive] = useState(false)
  return (
    <Navbar
      active={navbarMenuActive}
      className={classnames(
        navStyle.navbar,
        'is-spaced'
      )}
    >
      <Container>
        <Navbar.Brand>
          <NavLinkItem
            href='/'
            isActivable={false}
            className={navStyle.brand}
          >
            <img
              src={require('./assets/saic-logo.png')}
              className={navStyle.logo}
              alt=''
            />
            <img
              src={require('assets/warranty-logo.png')}
              className={navStyle.sublogo}
              alt=''
            />
          </NavLinkItem>
          <Navbar.Burger
            className={navStyle.burger}
            aria-label='menu'
            aria-expanded={navbarMenuActive}
            data-target='navbarMenu'
            renderAs='a'
            onClick={() => setnavbarMenuActive(!navbarMenuActive)}
          />
        </Navbar.Brand>
        <Navbar.Menu id='navbarMenu'>
          <Navbar.Container align='right'>
            <NavLinkItem href='/' isDefault>首页</NavLinkItem>
            <NavLinkItem href='/buy'>我要买车</NavLinkItem>
            <NavLinkItem href='/sell'>我要卖车</NavLinkItem>
            <NavLinkItem href='/exchange'>车辆置换</NavLinkItem>
            <NavLinkItem href='/verify'>上汽认证二手车查询</NavLinkItem>
            <NavLinkItem href='/dealer'>上汽认证中心查找</NavLinkItem>
          </Navbar.Container>
        </Navbar.Menu>
      </Container>
    </Navbar>
  )
}
export default Nav
