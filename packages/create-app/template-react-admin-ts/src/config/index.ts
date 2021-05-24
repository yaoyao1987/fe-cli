export interface Config {
  BASENAME?: string

  SUCCESS_CODE: number

  LOGIN_EXPIRE: number

  API_URL: string

  TOKEN_KEY: string

  layout: 'side' | 'top'

  theme: 'dark' | 'light'

  fixedHeader: boolean

  contentWidth: 'fluid' | 'fixed'

  sideWidth: number

  colorWeak: boolean

  title: string

  logo?: string
}

const AdminConfig: Config = {
  // react-router basename
  BASENAME: '/',

  // 请求成功状态码
  SUCCESS_CODE: 200,

  // 登录过期，或者未登录
  // LOGIN_EXPIRE: 400,
  LOGIN_EXPIRE: 10001,

  // 统一请求地址
  API_URL: 'http://pmp.shunwang.com/pmp',

  // 本地存储token 的key
  TOKEN_KEY: 'Admin_Token_key',

  // 默认菜单栏位置
  layout: 'top',

  // 默认主题颜色
  theme: 'light',

  // 是否固定头部
  fixedHeader: true,

  // 固定宽度或者流式宽度
  contentWidth: 'fixed',

  // 侧边栏宽度
  sideWidth: 220,

  // 是否开启色弱模式
  colorWeak: false,

  // 项目名称
  title: '项目管理系统',

  // logo
  logo: 'Logos',
}

export default AdminConfig
