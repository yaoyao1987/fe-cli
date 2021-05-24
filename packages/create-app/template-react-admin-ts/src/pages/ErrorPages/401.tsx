/* 401 没有权限 */

import React from 'react'
import { Link } from 'react-router-dom'
import { History } from 'history'

import './index.less'

interface Props {
  history: History
}

export default function NoPowerContainer(props: Props): JSX.Element {
  return (
    <div className="page-error">
      <div>
        <div className="title">401</div>
        <div className="info">你没有访问该页面的权限</div>
        <div className="info">请联系你的管理员</div>
        <Link to="/">返回首页</Link>
      </div>
    </div>
  )
}
