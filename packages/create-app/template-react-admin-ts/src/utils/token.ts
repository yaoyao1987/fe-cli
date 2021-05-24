import config from '../config'

// const Deadline = 1000 * 60 * 60 * 24 * 7; // 设置7天过期
// 获取存储的token
export function getToken() {
  const b: any = localStorage.getItem(config.TOKEN_KEY)
  const token = JSON.parse(b) || ''
  return token
}

// 设置存储的token
export function setToken(token: string) {
  localStorage.setItem(config.TOKEN_KEY, JSON.stringify(token))
}

// 删除存储的token
export function removeToken() {
  localStorage.removeItem(config.TOKEN_KEY)
}