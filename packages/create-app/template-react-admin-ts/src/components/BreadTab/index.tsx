/** 通用Tab切换导航 * */
import React, { useState, useEffect, memo } from 'react'
import './index.less'

// ==================
// 类型声明
// ==================
import { Menu } from '@/models/index.type'
import { History } from 'history'
import MenuDnd from './MenuDnd'

interface Props {
  location: Location
  history: History
  menus: Menu[]
}

function BreadCom(props: Props): JSX.Element {
  /** 根据当前location动态生成对应的面包屑 * */
  const [tabs, setTabs] = useState<Menu[]>([])

  useEffect(() => {
    const pathNow = props.menus.find((item) => item.url === props.location.pathname)

    if (pathNow && !tabs.find((item) => item.url === pathNow.url)) {
      setTabs((tabs) => {
        return [...tabs, pathNow]
      })
    }
  }, [props.location.pathname, props.menus, tabs])

  function onTabChange(item: Menu): void {
    if (props.location.pathname !== item.url) props.history.push(item.url)
  }

  function closeMenu(path: string) {
    const removeIndex = tabs.findIndex((item) => item.url === path)
    const resTabs = [...tabs]
    resTabs.splice(removeIndex, 1)

    const lastIndex = removeIndex - 1

    // 如果全部关闭了，就跳转到主页
    if (!resTabs.length) {
      props.history.push('/')
    } else if (path === props.location.pathname) {
      // 如果关闭的是当前页，就跳转到前一页，如果已经是第1页了，就跳转到新数组到第0项
      if (lastIndex >= 0) {
        props.history.push(resTabs[lastIndex].url)
      } else {
        props.history.push(resTabs[0].url)
      }
    }

    setTabs(resTabs)
  }

  return (
    <div className="BreadMenu">
      <MenuDnd
        currentKey={props.location.pathname}
        rangeVal={tabs}
        onClose={closeMenu}
        onChoose={onTabChange}
      />
    </div>
  )
}

export default memo(BreadCom)
