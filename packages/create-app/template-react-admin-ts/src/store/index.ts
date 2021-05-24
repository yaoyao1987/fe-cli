import { configureStore, ThunkAction, Action, combineReducers, Reducer } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authSlice } from './auth.slice'
import { userAdminSlice } from './user.slice'

// 项目中使用到的reducer
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  userAdmin: userAdminSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
