/* 主页 */

import React from 'react'
import ImgLogo from '@/assets/react-logo.jpg'

import './index.less'

export default function HomePageContainer(): JSX.Element {
  return (
    <div className="page-home all-nowarp">
      <div className="box">
        <img src={ImgLogo} />
        <div className="title">React后台管理系统</div>
        <div className="info">标准React+Redux分层结构，react17、router4、antd4、webpack5、ES6+</div>
      </div>
    </div>
  )
}
