import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Spin } from 'antd'

import { AppProviders } from '@/providers'
import routes from '@/routes';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <Suspense fallback={<Spin size='large' />}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </Suspense>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)