import React from 'react'
// import { Redirect } from 'react-router-dom'
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config'
import { useAuth } from '@/hooks/useAuth'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout;

const BasicLayout = (props: RouteConfigComponentProps) => {
  const { auth: { user } } = useAuth()
  const { route } = props
  console.log(`route.routes`, route?.routes)
  // return user ? renderRoutes(route?.routes) : <Redirect to="/login" />
  return (
    <Layout>
      <Header className='fixed' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className='logo' />
      </Header>
      <Content>
        {renderRoutes(route?.routes)}
      </Content>
      <Footer style={{ textAlign: 'center' }}>react vite pc template</Footer>
    </Layout>
  )
}

export default BasicLayout