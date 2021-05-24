import { lazy, createElement } from 'react'
import { Redirect } from "react-router-dom";
import { RouteConfig } from 'react-router-config'

const routesConfig: RouteConfig[] = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('@/pages/login'))
  },
  {
    path: '/',
    exact: false,
    component: lazy(() => import('@/layouts/BasicLayout')),
    routes: [
      {
        path: '/',
        exact: true,
        render: () => createElement(Redirect, { to: '/home' })
      },
      {
        path: '/home',
        exact: true,
        component: lazy(() => import('@/pages/home'))
      },
      {
        path: '/about',
        exact: true,
        component: lazy(() => import('@/pages/about'))
      }
    ]
  },
  // {
  //   path: '*',
  //   component: lazy(() => import('@/pages/login'))
  // }
]

export default routesConfig