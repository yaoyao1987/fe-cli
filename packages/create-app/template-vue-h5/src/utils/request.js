import { stringify } from 'qs'
import axios from 'axios'
import Raven from 'raven-js'
import router from '@/router'

// 创建axios实例
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? ''
      : '',
  timeout: process.env.NODE_ENV === 'development' ? 20000 : 5000, // request timeout
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: [
    function (data) {
      return stringify(data)
    }
  ],
  transformResponse: [
    function (data) {
      // 这里提前处理返回的数据
      return JSON.parse(data)
    }
  ]
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 请求成功
    const res = response.data
    if (res.code !== 0) {
      Raven.captureException(res)
      return Promise.reject(res.message)
    } else {
      return res
    }
  },
  error => {
    Raven.captureException(error)
    // 请求失败
    const { response } = error
    if (response && response.status === 401) {
      // 登录过期
    } else if (response && error.response.status === 403) {
      router.push('403')
    } else if (response && response.status === 500) {
      router.push('500')
    } else if (response && error.response.status === 502) {
      router.push('502')
    } else if (error.message.includes('timeout')) {
      // 判断请求异常信息中是否含有超时timeout字符串
      return Promise.reject('网络超时，请稍后再试') // reject这个错误信息
    } else {
      router.push('404')
    }
    return Promise.reject(error)
  }
)

export default instance
