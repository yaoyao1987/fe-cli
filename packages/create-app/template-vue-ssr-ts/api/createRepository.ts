import { Context } from '@nuxt/types'

import { UserRepository } from '@/api'
import { ERROR_TYPE } from '@/constants'
import { userRepository } from './userRepository'

export type Repository = {
  user: UserRepository
}

const createRepository = ({ app, $axios, redirect }: Context): Repository => {
  $axios.onError((error) => {
    if (!error.response) return
    const code = error.response.status

    if (code === ERROR_TYPE.UNPROCESSABLE) {
      return Promise.reject(error.response.data.errors)
    } else if (code === ERROR_TYPE.UNAUTHORIZED) {
      redirect('/login')
    } else if (code === ERROR_TYPE.FORBIDDEN) {
      app?.router?.back()
    } else if (code === ERROR_TYPE.NOTFOUND) {
      redirect('/')
    }
  })
  return {
    user: userRepository($axios),
  }
}

export default createRepository
