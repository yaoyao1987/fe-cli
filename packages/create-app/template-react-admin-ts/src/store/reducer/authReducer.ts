import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '@/utils/request'

export const fetchUserInfo = createAsyncThunk('auth/userInfo', async () => {
  const res = await request({
    url: `/api/me`,
    method: 'GET',
  })
  return res.data
})
