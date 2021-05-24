import { createSlice } from "@reduxjs/toolkit";
import * as auth from '@/services/auth'
import { AppDispatch, RootState } from ".";
import { AuthForm } from "@/typings/auth";
import { User } from '@/typings/user'

interface AuthState {
  user: User | null;
  error?: null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
  isError: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(`setUser`, action.payload)
      state.user = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isError = true;
      state.user = null;
    },
    removeUser: (state) => {
      state.user = null
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
})

export const { setUser, setError, setIsLoading } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export const login = (form: AuthForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { user } = await auth.login(form);
    console.log(`user`, user)
    localStorage.setItem('token', user.token)
    dispatch(setUser(user))
    dispatch(setIsLoading(false));
    return user
  } catch (error) {
    dispatch(setError(error));
    dispatch(setIsLoading(false));
  }
}

export const register = (form: AuthForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { user } = await auth.register(form);
    dispatch(setUser(user))
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setIsLoading(false));
  }
}
export const logout = () => (dispatch: AppDispatch) => {
  auth.logout().then(() => dispatch(setUser(null)))
}
export const bootstrap = () => async (dispatch: AppDispatch) => auth.bootstrapUser().then((user) => dispatch(setUser(user)));


export default authSlice.reducer