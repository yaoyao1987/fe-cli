import React, { FC } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Input } from 'antd'

import { useAuth } from '@/hooks/useAuth'
import { AuthForm } from '@/typings/auth'
import { ErrorMessage } from '@/components/ErrorMessage'

const Login: FC = () => {
  const { login, auth } = useAuth();

  console.log('auth :>> ', auth);
  const handleSubmit = async (values: AuthForm) => {
    await login(values)
  }

  return (
    <>
      {auth?.user && <Redirect to="/" />}
      <ErrorMessage error={auth?.error} />
      <Form onFinish={handleSubmit}>
        <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder='用户名' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
          <Input type='password' placeholder='请输入密码' />
        </Form.Item>
        <Form.Item>
          <Button loading={auth.isLoading} htmlType='submit' type='primary'>登录</Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login