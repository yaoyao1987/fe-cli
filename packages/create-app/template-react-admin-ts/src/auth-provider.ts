// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { UserBasicInfo } from '@/models/index.type'

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: UserBasicInfo }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(`/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    }
    return Promise.reject(await response.json())
  })
}

export const register = (data: { username: string; password: string }) => {
  return fetch(`/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    }
    return Promise.reject(await response.json())
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)
