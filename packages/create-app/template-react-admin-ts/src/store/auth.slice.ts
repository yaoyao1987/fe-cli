import { UserBasicInfo } from '@/models/index.type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as auth from '@/auth-provider'
import { AuthForm } from '@/types/login'
import { AppDispatch, RootState, AppThunk } from '@/store/index'
import { request } from '@/utils/request'
import { fetchUserInfo } from './reducer/authReducer'

interface State {
  user: UserBasicInfo | null
}

const initialState: State = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      // localStorage.setItem("curUser", action.payload.access);
    })
  },
})

const { setUser } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)))
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)))
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)))
