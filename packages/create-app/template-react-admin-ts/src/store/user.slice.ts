import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as auth from '@/auth-provider'
import { AuthForm } from '@/types/login'
import { AppDispatch, RootState, AppThunk } from '@/store/index'
import { fetchUserList, fetchAllRoles, upUser } from './reducer/userReducer'

interface State {
  userList: any[]
  userListCount: number
  userinfo: any
  powersCode: any
}

const initialState: State = {
  userList: [],
  userListCount: 0,
  userinfo: {},
  powersCode: '',
}

export const userAdminSlice = createSlice({
  name: 'userAdmin',
  initialState,
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserList.fulfilled, (state, action: any) => {
      console.log(action.payload)
      state.userList = action.payload.list || []
      state.userListCount = action.payload.total
    })
    builder.addCase(fetchAllRoles.fulfilled, (state, action) => {
      // localStorage.setItem("curUser", action.payload.access);
    })
  },
})

const { setUserList } = userAdminSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUserList(user)))
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUserList(user)))
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUserList(null)))
