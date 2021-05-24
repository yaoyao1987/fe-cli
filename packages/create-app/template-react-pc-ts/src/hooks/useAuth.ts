import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { User } from "@/typings/user"
import * as authStore from "@/store/auth.slice";
import { selectAuth } from "@/store/auth.slice"
import { AuthForm } from "@/typings/auth"

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  const auth = useSelector(selectAuth)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout), [dispatch])

  return {
    auth,
    login,
    register,
    logout
  }
}