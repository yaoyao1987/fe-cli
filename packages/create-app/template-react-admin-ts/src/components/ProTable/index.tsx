import React, { useRef, useState, memo, useCallback } from 'react'
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { TableProps } from 'rc-table/lib/Table'
import { SortOrder } from 'antd/lib/table/interface'

type requestProp = (
  params: {
    pageSize?: number
    current?: number
    keyword?: string
  },
  sort: Record<string, SortOrder>,
  filter: Record<string, React.ReactText[]>
) => Promise<any>

type T1 = () => void // 不能是 (): void;
type omitProp = 'columns' | 'rowKey'
interface proTableProps extends Omit<TableProps, omitProp> {
  columns: ProColumns[]
  toolBarRender?: any //工具栏渲染
  rowKey?: string
  rowSelection?: any
  actionRef?: any
  formRef?: any
  debounceTime?: number
  needSelect?: boolean // 是否有选择按钮
  search?: false // 是否有搜索表单
  form?: any
  request: requestProp
  options?:
    | { fullScreen?: boolean | T1; reload?: boolean | T1; setting?: true; density?: boolean }
    | false
}

function ProTableComponent<T>(props: proTableProps) {
  const actionRef = useRef<ActionType>()
  const { rowKey = 'id', needSelect = false, toolBarRender } = props
  const [record, setRecord] = useState<T | undefined>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  // const toolBarRenderComp = (action) => {
  //   console.log(action)
  //   return toolBarRender ? toolBarRender(record || {}) : false
  // }

  return (
    <ProTable<T>
      actionRef={actionRef}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        size: 'default',
        pageSize: 10,
      }}
      rowSelection={
        needSelect
          ? {
              type: 'radio',
              columnTitle: '选择',
              columnWidth: 80,
              fixed: true,
              selectedRowKeys,
              onChange: (selRowKeys: string[], selRows: T[]) => {
                if (selRows && selRows.length) {
                  setRecord(selRows[0])
                }
                setSelectedRowKeys(selRowKeys)
              },
            }
          : false
      }
      onRow={
        needSelect
          ? (currentRow: T) => {
              return {
                onClick: () => {
                  if (selectedRowKeys.length && selectedRowKeys[0] === currentRow[rowKey]) {
                    setSelectedRowKeys([])
                    setRecord(undefined)
                  } else {
                    setSelectedRowKeys([currentRow[rowKey]])
                    setRecord(currentRow)
                  }
                },
              }
            }
          : undefined
      }
      dateFormatter="string"
      {...props}
      toolBarRender={toolBarRender ? () => toolBarRender(record || {}) : false}
    />
  )
}

export default memo(ProTableComponent)
