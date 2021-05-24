import request from '@/utils/request'
import { AuthForm } from "@/typings/auth";
import { ResponseData } from '@/typings';
import { AxiosPromise } from 'axios';


export const bootstrapUser = async () => {
  let user = null
  const token = localStorage.getItem('token')
  if (token) {
    const data = await request({
      url: '/user'
    })
    user = data
  }
  return user
}

export const login = (data: AuthForm): AxiosPromise<ResponseData> =>
  request({
    url: '/login',
    method: 'POST',
    data
  })

export const register = (data: AuthForm): AxiosPromise<ResponseData> =>
  request({
    url: '/register',
    method: 'POST',
    data
  })

export const logout = (): AxiosPromise<ResponseData> =>
  request({
    url: '/logout',
    method: 'POST'
  })