import React from 'react'
import ProTable from '@/components/ProTable'
import { ProColumns, TableDropdown } from '@ant-design/pro-table'
import { Button, Space, Tag } from 'antd'
import { dataSourceItem } from '@/types/data'
import { PlusOutlined } from '@ant-design/icons'
import { request } from '@/utils/request'

export default () => {
  //定义表格列表
  const columns: ProColumns<dataSourceItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
          disabled: true,
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
    },
    {
      title: '标签',
      dataIndex: 'labels',
      search: false,
      renderFormItem: (
        _: any,
        { defaultRender }: { defaultRender: (item: any) => React.ReactNode }
      ) => {
        return defaultRender(_)
      },
      render: (_, record) => (
        <Space>
          {record.labels.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          }
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ]

  // 定义工具栏
  const toolBarRender = () => {
    return [
      <Button key="button" icon={<PlusOutlined />} type="primary">
        新建
      </Button>,
    ]
  }

  // 请求数据源
  const queryData = async (params = {}) => {
    return request({
      url: `https://proapi.azurewebsites.net/github/issues`,
      method: 'GET',
      data: params,
    })
  }

  //表单查询数据
  const form = {
    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
    syncToUrl: (values: any, type: any) => {
      if (type === 'get') {
        return {
          ...values,
          created_at: [values.startTime, values.endTime],
        }
      }
      return values
    },
  }

  return (
    <ProTable
      columns={columns}
      toolBarRender={toolBarRender}
      request={queryData}
      rowKey="id"
      form={form}
    />
  )
}
