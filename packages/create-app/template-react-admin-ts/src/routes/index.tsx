import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { CacheSwitch } from 'react-router-cache-route'
import tools from '@/utils/tools'
import routesConfig, { IFMenu } from './config'
import RouteWrapper from './RouteWrapper'

type CRouterProps = {
  auth: any
}

const CRouter = (props: CRouterProps) => {
  const { auth } = props
  const [smenus] = useState([])

  const getPermits = (): any[] | null => {
    return auth ? auth.permissions : null
  }
  const requireAuth = (permit: any, component: React.ReactElement) => {
    const permits = getPermits()
    if (!permits || !permits.includes(permit)) return <Redirect to={'404'} />
    return component
  }
  const requireLogin = (component: React.ReactElement, permit: any) => {
    const permits = getPermits()
    if (!tools.checkLogin(permits)) {
      // 线上环境判断是否登录
      return <Redirect to={'/login'} />
    }
    return permit ? requireAuth(permit, component) : component
  }
  const createMenu = (r: IFMenu) => {
    const route = (r: IFMenu) => {
      const Component = r.component
      return (
        <Route
          key={r.url}
          exact
          path={r.url}
          render={(props: any) => {
            // 重新包装组件
            const wrapper = <RouteWrapper {...{ ...props, Comp: Component, route: r }} />
            return r.login ? wrapper : requireLogin(wrapper, r.requireAuth)
          }}
        />
      )
    }

    const subRoute = (r: IFMenu): any =>
      r.children && r.children.map((subR: IFMenu) => (subR.children ? subRoute(subR) : route(subR)))

    return r.component ? route(r) : subRoute(r)
  }
  const createRoute = (key: string) => routesConfig[key].map(createMenu)
  const getAsyncMenus = () => smenus || localStorage.getItem('smenus') || []
  return (
    <CacheSwitch>
      <Redirect exact from="/" to="/dashboard" />
      {Object.keys(routesConfig).map((key) => createRoute(key))}
      {getAsyncMenus().map(createMenu)}
      <Route render={() => <Redirect to="/404" />} />
    </CacheSwitch>
  )
}

export default CRouter
