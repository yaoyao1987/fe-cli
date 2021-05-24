import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/auth.slice'

export const rootReducer = {
  auth: authReducer
}

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>