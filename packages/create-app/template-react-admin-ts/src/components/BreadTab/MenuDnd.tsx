import React, { useEffect, useState, useCallback, memo } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './index.less'
import { Menu } from '@/models/index.type'

interface MenuDndProps {
  rangeVal: Menu[]
  onClose: any
  onChoose: any
  currentKey: string
}

// 重新记录数组顺序
const reorder = (list: Menu[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  // 删除并记录 删除元素1
  const [removed] = result.splice(startIndex, 1)
  // 将原来的元素添加进数组
  result.splice(endIndex, 0, removed)
  return result
}

function MenuDnd({ rangeVal, onClose, onChoose, currentKey }: MenuDndProps): JSX.Element {
  const [data, setData] = useState<Menu[]>([])
  // 根据 选中的菜单 往里添加拖拽选项
  useEffect(() => {
    let old: Menu[] = [...data]
    rangeVal.forEach((item: Menu) => {
      if (!data.find((i: Menu) => i.url === item.url)) {
        old.push(item)
      }
    })
    old = old.filter((i) => rangeVal.find((item) => item.url === i.url))
    setData(old)
    // eslint-disable-next-line
  }, [rangeVal])

  // 拖拽结束
  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return
      }
      // 获取拖拽后的数据 重新赋值
      const newData = reorder(data, result.source.index, result.destination.index)
      setData(newData)
    },
    [data]
  )

  // 关闭当前顶部菜单
  const closeCurrent = (url: string) => {
    const newData = data.filter((i) => i.url !== url)
    const next = newData[newData.length - 1]
    if (next) {
      setData(newData)
    }
    onClose(url)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* direction代表拖拽方向  默认垂直方向  水平方向:horizontal */}
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          // 这里是拖拽容器 在这里设置容器的宽高等等...
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="dnd-body hide-scrollbar"
          >
            {/* 这里放置所需要拖拽的组件,必须要被 Draggable 包裹 */}
            {data.map((item, index) => (
              <Draggable index={index} key={item.url} draggableId={item.url}>
                {(provided) => (
                  // 在这里写你的拖拽组件的样式 dom 等等...
                  <div
                    className={currentKey === item.url ? 'dnd-items active' : 'dnd-items'}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                    onClick={() => onChoose(item)}
                  >
                    {item.title}
                    <CloseOutlined
                      className="action-close"
                      type="icon_close"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        closeCurrent(item.url)
                      }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {/* 这个不能少 */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default memo(MenuDnd)
