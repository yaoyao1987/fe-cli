import React from 'react'
import Loadable from 'react-loadable'
import Loading from '@/components/Loading'
import { Menu } from '@/models/index.type'

export interface IFMenu extends Menu {
  children?: IFMenu[]
  component?: any
}

const loadPage = (loader: any) => {
  return Loadable({
    loader,
    loading: Loading,
  })
}

/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 */
export function flattenRouteFunc(routeList: IFMenu[]): IFMenu[] {
  const result: IFMenu[] = []
  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i]
    const { children, component, ...restProps } = route

    result.push({
      ...restProps,
    })
    if (route.children) {
      result.push(...flattenRouteFunc(route.children))
    }
  }

  return result
}

const menus: {
  menus: IFMenu[]
  others: IFMenu[] | []
  [index: string]: any
} = {
  menus: [
    // 菜单相关路由
    {
      id: 1,
      url: '/dashboard', // 链接路径
      title: '首页', // 标题
      icon: 'icon-homepage', // iconfont图标
      sorts: 1, // 排序编号
      parent: null,
      component: loadPage(() => import('@/pages/Home')),
    },
    {
      id: 2,
      url: '/project',
      title: '项目列表',
      icon: 'icon-order',
      sorts: 2,
      parent: null,
      desc: '',
      component: loadPage(() => import('@/pages/TableList')),
    },
    {
      id: 3,
      url: '/animation',
      title: '动画',
      icon: 'icon-project',
      sorts: 3,
      parent: null,
      children: [
        {
          id: 301,
          url: '/animation/basicAnimations',
          title: '基础动画',
          parent: 3,
          component: loadPage(() => import('@/pages/Animation/BasicAnimations')),
        },
        {
          id: 302,
          url: '/animation/exampleAnimations',
          title: '动画案例',
          parent: 3,
          component: loadPage(() => import('@/pages/Animation/ExampleAnimations')),
        },
      ],
    },
    {
      id: 4,
      url: '/userAdmin',
      title: '用户管理',
      icon: 'icon-project',
      sorts: 4,
      parent: null,
      component: loadPage(() => import('@/pages/UserManagement')),
    },
    {
      id: 5,
      url: '/iconList',
      title: '图标管理',
      icon: 'icon-collection',
      sorts: 5,
      parent: null,
      component: loadPage(() => import('@/pages/Icon')),
    },
    {
      id: 6,
      url: '/tableList2',
      title: '列表展示',
      icon: 'icon-collection',
      sorts: 65,
      parent: null,
      component: loadPage(() => import('@/pages/TableList2')),
    },
    // {
    //     key: '/app/animation',
    //     title: '动画',
    //     icon: 'rocket',
    //     children: [
    //         {
    //             key: '/app/animation/basicAnimations',
    //             title: '基础动画',
    //             component: 'BasicAnimations',
    //         },
    //         {
    //             key: '/app/animation/exampleAnimations',
    //             title: '动画案例',
    //             component: 'ExampleAnimations',
    //         },
    //     ],
    // },
    // {
    //     key: '/app/table',
    //     title: '表格',
    //     icon: 'copy',
    //     children: [
    //         { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable' },
    //         { key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable' },
    //         {
    //             key: '/app/table/asynchronousTable',
    //             title: '异步表格',
    //             component: 'AsynchronousTable',
    //         },
    //     ],
    // },
    // {
    //     key: '/app/chart',
    //     title: '图表',
    //     icon: 'area-chart',
    //     children: [
    //         { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
    //         { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
    //     ],
    // },
    // {
    //   key: "/children4",
    //   title: "页面",
    //   icon: "switcher",
    //   children: [
    //     { key: "/login", title: "登录" },
    //     { key: "/404", title: "404" },
    //   ],
    // },
    // {
    //     key: '/app/auth',
    //     title: '权限管理',
    //     icon: 'safety',
    //     children: [
    //         { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
    //         {
    //             key: '/app/auth/routerEnter',
    //             title: '路由拦截',
    //             component: 'RouterEnter',
    //             requireAuth: 'auth/testPage',
    //         },
    //     ],
    // },
    // {
    //     key: '/app/cssModule',
    //     title: 'cssModule',
    //     icon: 'star',
    //     component: 'Cssmodule',
    // },
    // {
    //     key: '/app/extension',
    //     title: '功能扩展',
    //     icon: 'bars',
    //     children: [
    //         {
    //             key: '/app/extension/queryParams',
    //             title: '问号形式参数',
    //             component: 'QueryParams',
    //             query: '?param1=1&param2=2',
    //         },
    //         {
    //             key: '/app/extension/visitor',
    //             title: '访客模式',
    //             component: 'Visitor',
    //             login: true,
    //         },
    //         {
    //             key: '/app/extension/multiple',
    //             title: '多级菜单',
    //             children: [
    //                 {
    //                     key: '/app/extension/multiple/child',
    //                     title: '多级菜单子菜单',
    //                     children: [
    //                         {
    //                             key: '/app/extension/multiple/child/child',
    //                             title: '多级菜单子子菜单',
    //                             component: 'MultipleMenu',
    //                         },
    //                     ],
    //                 },
    //             ],
    //         },
    //         {
    //             key: '/app/extension/env',
    //             title: '环境配置',
    //             component: 'Env',
    //         },
    //     ],
    // },
  ],
  others: [], // 非菜单相关路由
}

export const flattenRoute = flattenRouteFunc(menus.menus)

export default menus
