import React, { FC } from 'react'
import { Button, Form, Input } from 'antd'

import { useAuth } from '@/hooks/useAuth'
import { AuthForm } from '@/typings/auth'

const Register: FC = () => {
  const { register, auth } = useAuth();
  const handleSubmit = async (values: AuthForm) => {
    try {
      await register(values)
    } catch (e) {
      console.log('e :>> ', e);
    }
  }

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item name='username' rules={[{ required: true, message: '邮箱' }]}>
          <Input placeholder='用户名' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
          <Input type='password' placeholder='至少6位密码，区分大小写' />
        </Form.Item>
        <Form.Item name='confirmPassword' rules={[{ required: true, message: '请输入确认密码' }]}>
          <Input type='password' placeholder='确认密码' />
        </Form.Item>
        <Form.Item>
          <Button loading={auth.isLoading} htmlType='submit' type='primary'>登录</Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Register