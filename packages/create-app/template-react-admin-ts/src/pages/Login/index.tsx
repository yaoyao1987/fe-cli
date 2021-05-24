/** 登录页 * */

// ==================
// 所需的各种插件
// ==================
import React, { useState, useEffect, useCallback } from 'react'
import tools from '@/utils/tools'

// ==================
// 所需的所有组件
// ==================
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import CanvasBack from '@/components/CanvasBack'
import LogoImg from '@/assets/logo.png'

// ==================
// 类型声明
// ==================
import { Role, Menu, Power, UserBasicInfo, Res } from '@/models/index.type'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { History } from 'history'
import { match } from 'react-router-dom'

// ==================
// CSS
// ==================
import './index.less'

/**
 * 每个页面都自动被注入history,location,match 3个对象
 */
type Props = {
  history: History
  location: Location
  match: match
}

// ==================
// 本组件
// ==================
function LoginContainer(props: Props): JSX.Element {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false) // 是否正在登录中
  const [rememberPassword, setRememberPassword] = useState(false) // 是否记住密码
  const [codeValue, setCodeValue] = useState('00000') // 当前验证码的值
  const [show, setShow] = useState(false) // 加载完毕时触发动画

  // 进入登陆页时，判断之前是否保存了用户名和密码
  useEffect(() => {
    const userLoginInfo = localStorage.getItem('userLoginInfo')
    if (userLoginInfo) {
      const userLoginInfoObj = JSON.parse(userLoginInfo)
      setRememberPassword(true)

      form.setFieldsValue({
        username: userLoginInfoObj.username,
        password: tools.uncompile(userLoginInfoObj.password),
      })
    }
    if (!userLoginInfo) {
      document.getElementById('username')?.focus()
    } else {
      document.getElementById('vcode')?.focus()
    }
    setShow(true)
  }, [form])

  /**
   * 执行登录
   * 这里模拟：
   * 1.登录，得到用户信息
   * 2.通过用户信息获取其拥有的所有角色信息
   * 3.通过角色信息获取其拥有的所有权限信息
   * * */
  const loginIn = useCallback(async (username, password) => {
    const userBasicInfo: UserBasicInfo | null = null
    // let roles: Role[] = [];
    // let menus: Menu[] = [];
    // let powers: Power[] = [];

    /** 1.登录 （返回信息中有该用户拥有的角色id） * */
    // const res1: Res | undefined = await props.onLogin({ username, password });
    // if (!res1 || res1.code !== 200 || !res1.data) {
    //   // 登录失败
    //   return res1;
    // }

    // userBasicInfo = res1.data;

    // /** 2.根据token获取角色信息 **/
    // const res2 = await props.getUserInfo();
    // if (!res2 || res2.code !== 200) {
    //   // 角色查询失败
    //   return res2;
    // }

    // /** 3.根据菜单id 获取菜单信息 **/
    // const menuAndPowers = roles.reduce(
    //   (a, b) => [...a, ...b.menuAndPowers],
    //   []
    // );
    // const res3 = await props.getMenusById({
    //   id: Array.from(new Set(menuAndPowers.map((item) => item.menuId))),
    // });
    // if (!res3 || res3.code !== 200) {
    //   // 查询菜单信息失败
    //   return res3;
    // }
    //
    // menus = res3.data.filter((item: Menu) => item.conditions === 1);

    // /** 4.根据权限id，获取权限信息 **/
    // const res4 = await props.getPowerById({
    //   id: Array.from(
    //     new Set(menuAndPowers.reduce((a, b) => [...a, ...b.powers], []))
    //   ),
    // });
    // if (!res4 || res4.code !== 200) {
    //   // 权限查询失败
    //   return res4;
    // }
    // powers = res4.data.filter((item: Power) => item.conditions === 1);
    return {
      code: 200,
      data: { userBasicInfo, roles: [], menus: [], powers: [] },
      msg: 'success',
    }
  }, [])

  // 用户提交登录
  const onSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      const res = await loginIn(values.username, values.password)
      if (res && res.code === 200) {
        message.success('登录成功')
        if (rememberPassword) {
          localStorage.setItem(
            'userLoginInfo',
            JSON.stringify({
              username: values.username,
              password: tools.compile(values.password), // 密码简单加密一下再存到localStorage
            })
          ) // 保存用户名和密码
        } else {
          localStorage.removeItem('userLoginInfo')
        }
        /** 将这些信息加密后存入sessionStorage,并存入store * */
        sessionStorage.setItem('userinfo', tools.compile(JSON.stringify(res.data)))
        // await props.setUserInfo(res.data);
        props.history.replace('/') // 跳转到主页
      } else {
        message.error(res?.msg ?? '登录失败')
        setLoading(false)
      }
    } catch (e) {
      // 验证未通过
    }
  }

  // 记住密码按钮点击
  const onRemember = (e: CheckboxChangeEvent): void => {
    setRememberPassword(e.target.checked)
  }

  return (
    <div className="page-login">
      <div className="canvas-box">
        <CanvasBack row={12} col={8} />
      </div>
      <div className={show ? 'login-box show' : 'login-box'}>
        <Form form={form}>
          <div className="title">
            <img src={LogoImg} alt="logo" />
            <span>后台管理系统</span>
          </div>
          <div>
            <Form.Item
              name="username"
              rules={[
                { max: 12, message: '最大长度为12位字符' },
                {
                  required: true,
                  whitespace: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="username" // 为了获取焦点
                placeholder="admin/user"
                onPressEnter={onSubmit}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { max: 18, message: '最大长度18个字符' },
              ]}
            >
              <Input
                prefix={<KeyOutlined style={{ fontSize: 13 }} />}
                size="large"
                type="password"
                placeholder="123456/123456"
                onPressEnter={onSubmit}
              />
            </Form.Item>
            <div style={{ lineHeight: '40px' }}>
              <Checkbox className="remember" checked={rememberPassword} onChange={onRemember}>
                记住密码
              </Checkbox>
              <Button
                className="submit-btn"
                size="large"
                type="primary"
                loading={loading}
                onClick={onSubmit}
              >
                {loading ? '请稍后' : '登录'}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginContainer
