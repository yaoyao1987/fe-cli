/* 404 NotFound */

import React from 'react'
import { Link } from 'react-router-dom'
import { History } from 'history'

import './index.less'

interface Props {
  history: History
}

export default function NotFoundContainer(props: Props): JSX.Element {
  return (
    <div className="page-error">
      <div>
        <div className="title">404</div>
        <div className="info">Oh dear</div>
        <div className="info">这里什么也没有</div>
        <Link to="/">返回首页</Link>
      </div>
    </div>
  )
}
