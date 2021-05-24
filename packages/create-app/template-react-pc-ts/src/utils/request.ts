import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { notification } from 'antd';
import { createBrowserHistory } from 'history';
// import { stringify } from 'qs'

const history = createBrowserHistory();

const instance = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_BASE_URL + ''
})

// request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.token = token
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
)

// response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data = {} } = response
    console.log('response:', response); // for debug

    if (status === 200) {
      return data as any
    }

    notification.error({
      message: `请求错误 ${response.statusText}: ${response}`,
      description: data || response.statusText || 'Error',
    })

    if (response.status === 401) {
      history.push('/login');
    }
    return Promise.reject(data)
  },
  (error: AxiosError) => {
    console.log('error:', error); // for debug
    console.log('error response:', error.response); // for debug
    const { response } = error

    return Promise.reject(response?.data);
  }
)

export default instance;