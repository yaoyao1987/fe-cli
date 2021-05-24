/** User 用户管理 * */

// ==================
// 所需的第三方库
// ==================
import React, { useState, useMemo, memo } from 'react'
import { useSetState, useMount } from 'react-use/lib'
import { useSelector, useDispatch } from 'react-redux'
import {
  Form,
  Button,
  Input,
  Table,
  message,
  Popconfirm,
  Modal,
  Tooltip,
  Divider,
  Select,
} from 'antd'
import {
  EyeOutlined,
  // EditOutlined,
  ToolOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { fetchUserList, upUser } from '@/store/reducer/userReducer'
// ==================
// 所需的自定义的东西
// ==================
import tools from '@/utils/tools'

// ==================
// 类型声明
// ==================
import { RootState, AppDispatch } from '@/store'
import {
  TableRecordData,
  Page,
  operateType,
  ModalType,
  SearchInfo,
  RoleTreeInfo,
  UserBasicInfoParam,
  Res,
  Props,
} from './index.type'

// ==================
// CSS
// ==================
import './index.less' // 工具函数

const { TextArea } = Input
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
}

// ==================
// 本组件
// ==================
function UserAdminContainer(props: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const userinfo = useSelector((state: RootState) => state.userAdmin.userinfo)
  const userList = useSelector((state: RootState) => state.userAdmin.userList) // 当前页面列表数据
  const userListCount = useSelector((state: RootState) => state.userAdmin.userListCount) // 当前页面列表数据个数
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false) // 数据是否正在加载中

  // 分页相关参数
  const [page, setPage] = useSetState<Page>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })

  // 模态框相关参数
  const [modal, setModal] = useSetState<ModalType>({
    operateType: 'add', // see查看，add添加，up修改
    nowData: null,
    modalShow: false,
    modalLoading: false,
  })

  // 搜索相关参数
  const [searchInfo, setSearchInfo] = useSetState<SearchInfo>({
    username: undefined, // 用户名
    conditions: undefined, // 状态
  })

  // 生命周期 - 组件挂载时触发一次
  useMount(() => {
    onGetData(page)
  })

  // 函数 - 查询当前页面所需列表数据
  async function onGetData(page: { pageNum: number; pageSize: number }): Promise<void> {
    const params = {
      pageNum: page.pageNum,
      pageSize: page.pageSize,
      username: searchInfo.username,
      conditions: searchInfo.conditions,
    }
    setLoading(true)
    try {
      await dispatch(fetchUserList(tools.clearNull(params))).then((res: any) => {
        setPage({
          pageNum: page.pageNum,
          pageSize: page.pageSize,
          total: res.total,
        })
      })
    } finally {
      setLoading(false)
    }
  }

  // 搜索 - 名称输入框值改变时触发
  const searchUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length < 20) {
      setSearchInfo({ username: e.target.value })
    }
  }

  // 搜索 - 状态下拉框选择时触发
  const searchConditionsChange = (v: number): void => {
    setSearchInfo({ conditions: v })
  }

  // 搜索
  const onSearch = (): void => {
    onGetData(page)
  }

  /**
   * 添加/修改/查看 模态框出现
   * @param data 当前选中的那条数据
   * @param type add添加/up修改/see查看
   * * */
  const onModalShow = (data: TableRecordData | null, type: operateType): void => {
    setModal({
      modalShow: true,
      nowData: data,
      operateType: type,
    })
    // 用setTimeout是因为首次让Modal出现时得等它挂载DOM，不然form对象还没来得及挂载到Form上
    setTimeout(() => {
      if (type === 'add') {
        // 新增，需重置表单各控件的值
        form.resetFields()
      } else if (data) {
        // 查看或修改，需设置表单各控件的值为当前所选中行的数据
        form.setFieldsValue({
          formConditions: data.conditions,
          formDesc: data.desc,
          formUsername: data.username,
          formPhone: data.phone,
          formEmail: data.email,
          formPassword: data.password,
        })
      }
    })
  }

  /** 模态框关闭 * */
  const onClose = () => {
    setModal({
      modalShow: false,
    })
  }

  /** 模态框确定 * */
  const onOk = async (): Promise<void> => {
    if (modal.operateType === 'see') {
      onClose()
      return
    }
    try {
      const values = await form.validateFields()
      setModal({
        modalLoading: true,
      })
      const params: UserBasicInfoParam = {
        username: values.formUsername,
        password: values.formPassword,
        phone: values.formPhone,
        email: values.formEmail,
        desc: values.formDesc,
        conditions: values.formConditions,
      }
      if (modal.operateType === 'add') {
        // 新增
        // try {
        //   const res: Res | undefined = await dispatch.sys.addUser(params);
        //   if (res && res.code === 200) {
        //     message.success("添加成功");
        //     onGetData(page);
        //     onClose();
        //   } else {
        //     message.error(res?.msg ?? "操作失败");
        //   }
        // } finally {
        //   setModal({
        //     modalLoading: false,
        //   });
        // }
        // }
      } else {
        // 修改
        params.id = modal.nowData?.id
        try {
          const res: any = await dispatch(upUser(params))
          if (res) {
            message.success('修改成功')
            onGetData(page)
            onClose()
          }
        } finally {
          setModal({
            modalLoading: false,
          })
        }
      }
    } catch {
      // 未通过校验
    }
  }

  // 删除某一条数据
  const onDel = async (id: number): Promise<void> => {
    setLoading(true)
    // try {
    //   const res = await dispatch.sys.delUser({ id });
    //   if (res && res.status === 200) {
    //     message.success("删除成功");
    //     onGetData(page);
    //   } else {
    //     message.error(res?.msg ?? "操作失败");
    //   }
    // } finally {
    //   setLoading(false);
    // }
  }

  // 表格页码改变
  const onTablePageChange = (pageNum: number, pageSize: number): void => {
    onGetData({ pageNum, pageSize })
  }

  // ==================
  // 属性 和 memo
  // ==================

  // table字段
  const tableColumns = [
    {
      title: '序号',
      dataIndex: 'serial',
      key: 'serial',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '状态',
      dataIndex: 'conditions',
      key: 'conditions',
      render: (v: number): JSX.Element =>
        v === 1 ? (
          <span style={{ color: 'green' }}>启用</span>
        ) : (
          <span style={{ color: 'red' }}>禁用</span>
        ),
    },
    {
      title: '操作',
      key: 'control',
      width: 200,
      render: (v: null, record: TableRecordData) => {
        const controls = []
        const u = userinfo.userBasicInfo || { id: -1 }
        controls.push(
          <span key="0" className="control-btn green" onClick={() => onModalShow(record, 'see')}>
            <Tooltip placement="top" title="查看">
              <EyeOutlined />
            </Tooltip>
          </span>
        )
        controls.push(
          <span key="1" className="control-btn blue" onClick={() => onModalShow(record, 'up')}>
            <Tooltip placement="top" title="修改">
              <ToolOutlined />
            </Tooltip>
          </span>
        )

        u.id !== record.id &&
          controls.push(
            <Popconfirm
              key="3"
              title="确定删除吗?"
              onConfirm={() => onDel(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <span className="control-btn red">
                <Tooltip placement="top" title="删除">
                  <DeleteOutlined />
                </Tooltip>
              </span>
            </Popconfirm>
          )

        const result: JSX.Element[] = []
        controls.forEach((item, index) => {
          if (index) {
            result.push(<Divider key={`line${index}`} type="vertical" />)
          }
          result.push(item)
        })
        return result
      },
    },
  ]

  // table列表所需数据
  const tableData = useMemo(() => {
    return userList.map((item, index) => {
      return {
        key: index,
        id: item.id,
        serial: index + 1 + (page.pageNum - 1) * page.pageSize,
        username: item.username,
        password: item.password,
        phone: item.phone,
        email: item.email,
        desc: item.desc,
        conditions: item.conditions,
        control: item.id,
        roles: item.roles,
      }
    })
  }, [page, userList])

  return (
    <div>
      <div className="g-search">
        <ul className="search-func">
          <li>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => onModalShow(null, 'add')}
            >
              添加用户
            </Button>
          </li>
        </ul>
        <Divider type="vertical" />
        <ul className="search-ul">
          <li>
            <Input
              placeholder="请输入用户名"
              onChange={searchUsernameChange}
              value={searchInfo.username}
            />
          </li>
          <li>
            <Select
              placeholder="请选择状态"
              allowClear
              style={{ width: '200px' }}
              onChange={searchConditionsChange}
              value={searchInfo.conditions}
            >
              <Option value={1}>启用</Option>
              <Option value={-1}>禁用</Option>
            </Select>
          </li>
          <li>
            <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
              搜索
            </Button>
          </li>
        </ul>
      </div>
      <div className="diy-table">
        <Table
          columns={tableColumns}
          loading={loading}
          dataSource={tableData}
          pagination={{
            total: page.total,
            current: page.pageNum,
            pageSize: page.pageSize,
            showQuickJumper: true,
            showTotal: (t, range) => `共 ${t} 条数据`,
            onChange: onTablePageChange,
          }}
        />
      </div>
      {/* 新增&修改&查看 模态框 */}
      <Modal
        title={{ add: '新增', up: '修改', see: '查看' }[modal.operateType]}
        visible={modal.modalShow}
        onOk={onOk}
        onCancel={onClose}
        confirmLoading={modal.modalLoading}
      >
        <Form
          form={form}
          initialValues={{
            formConditions: 1,
          }}
        >
          <Form.Item
            label="用户名"
            name="formUsername"
            {...formItemLayout}
            rules={[
              { required: true, whitespace: true, message: '必填' },
              { max: 12, message: '最多输入12位字符' },
            ]}
          >
            <Input placeholder="请输入用户名" disabled={modal.operateType === 'see'} />
          </Form.Item>
          <Form.Item
            label="密码"
            name="formPassword"
            {...formItemLayout}
            rules={[
              { required: true, whitespace: true, message: '必填' },
              { min: 6, message: '最少输入6位字符' },
              { max: 18, message: '最多输入18位字符' },
            ]}
          >
            <Input
              type="password"
              placeholder="请输入密码"
              disabled={modal.operateType === 'see'}
            />
          </Form.Item>
          <Form.Item
            label="电话"
            name="formPhone"
            {...formItemLayout}
            rules={[
              () => ({
                validator: (rule, value) => {
                  const v = value
                  if (v) {
                    if (!tools.checkPhone(v)) {
                      return Promise.reject('请输入有效的手机号码')
                    }
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <Input
              placeholder="请输入手机号"
              maxLength={11}
              disabled={modal.operateType === 'see'}
            />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="formEmail"
            {...formItemLayout}
            rules={[
              () => ({
                validator: (rule, value) => {
                  const v = value
                  if (v) {
                    if (!tools.checkEmail(v)) {
                      return Promise.reject('请输入有效的邮箱地址')
                    }
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <Input placeholder="请输入邮箱地址" disabled={modal.operateType === 'see'} />
          </Form.Item>
          <Form.Item
            label="描述"
            name="formDesc"
            {...formItemLayout}
            rules={[{ max: 100, message: '最多输入100个字符' }]}
          >
            <TextArea
              rows={4}
              disabled={modal.operateType === 'see'}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="状态"
            name="formConditions"
            {...formItemLayout}
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select disabled={modal.operateType === 'see'}>
              <Option key={1} value={1}>
                启用
              </Option>
              <Option key={-1} value={-1}>
                禁用
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default memo(UserAdminContainer)
