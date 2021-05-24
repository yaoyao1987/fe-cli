import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '@/utils/request'
import qs from 'qs'
import { userListParam, UserBasicInfoParam } from '@/models/index.type'

export const fetchUserList = createAsyncThunk('auth/userList', async (params: userListParam) => {
  const res = await request({
    url: `/api/getUserList?${qs.stringify(params)}`,
    method: 'GET',
  })
  return res.data
})

export const fetchAllRoles = createAsyncThunk('auth/allRoles', async () => {
  const res = await request({
    url: `/api/getAllRoles`,
    method: 'GET',
  })
  return res.data
})

export const upUser = createAsyncThunk('auth/upUser', async (params: UserBasicInfoParam) => {
  const res = await request({
    url: `/api/upUser`,
    method: 'POST',
    data: params,
  })
  return res.data
})
