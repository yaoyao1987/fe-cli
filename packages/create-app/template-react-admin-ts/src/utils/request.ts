import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { message } from 'antd'
import { store } from '@/store'
import { logout } from '@/store/auth.slice'
import AdminConfig from '../config'
import { getToken } from './token'
import { cleanObject } from './index'
// import { clearSideBarRoutes } from "../store/module/app";

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
})

interface ResponseData<T> {
  code: number

  data: T

  message: string
}

// 指定 axios 请求类型

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
}
// axios.defaults.timeout= 3000,
// 指定请求地址

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? AdminConfig.API_URL : ''

// 添加请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { token } = getToken()
    const { method = 'get', data = {} } = config
    const params = cleanObject(data)
    // window.console.log('getToken', token)
    // 获取用户token，用于校验
    /* eslint-disable  no-param-reassign */
    if (token) {
      config.headers.authority = token
    }
    switch (method.toLocaleLowerCase()) {
      case 'post':
      case 'put':
        if (config.headers['content-type'] === 'mulitipart/form-data') {
          const newData = new FormData()
          Object.keys(params).map((item) => {
            // @ts-ignore
            newData.append(item, params[item])
          })
          config.data = newData
        } else {
          config.data = params
        }
        break
      case 'get':
      case 'delete':
      default:
        config.params = params
        break
    }

    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// 添加响应拦截器，拦截登录过期或者没有权限

axios.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    if (!response.data) {
      return Promise.resolve(response)
    }

    // 登录已过期或者未登录
    if (response.data.code === AdminConfig.LOGIN_EXPIRE) {
      message.error(response.data.message, 2).then(
        () => {
          // store.dispatch(clearSideBarRoutes());
          store.dispatch(logout())
          window.location.href = `${
            window.location.origin
          }/system/login?redirectURL=${encodeURIComponent(window.location.href)}`
        }
        // () => {}
      )
    }
    // 请求成功
    if (response.data.code === AdminConfig.SUCCESS_CODE) {
      return response.data as any
    }

    //@ts-ignore
    if (response.data.success) {
      return response.data as any
    }

    // 请求成功，状态不为成功时
    message.error(response.data.message)

    return Promise.reject(response.data)
  },
  (error: AxiosError) => {
    message.error(error.message)
    return Promise.reject(error)
  }
)

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
  return axios.request<T>(options)
}
