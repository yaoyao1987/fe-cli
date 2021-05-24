import React from 'react'
import { Row, Col } from 'antd'
import IconComp from '@/components/Icon'
import './index.less'

const iconData = require('@/components/Icon/iconfont.json')

const prefix_name = iconData.css_prefix_text
const initData = iconData.glyphs.map((item: any) => ({
  ...item,
  type: prefix_name + item.font_class,
}))
console.log(initData)
export default function Icons() {
  return (
    <div className="icons-container">
      <h2>Icon图标</h2>
      <Row className="mt10 pd10">
        {initData.map((item: any) => {
          return (
            <Col span={2} className="icon-item" key={item.icon_id}>
              <IconComp type={item.type} />
              <div>{item.type}</div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
