import Vue from 'vue'
import axios from 'axios'

// TODO, 系统错误捕获
// eslint-disable-next-line
const getErr = async (err: Error, vm: Vue, info: string) => {
  await axios.post('/api/getErr', { err: err.stack, hook: info })
}

const errorHandler = (err: Error, vm: Vue, info: string) => {
  getErr(err, vm, info)
}

Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (err: Error, vm: Vue, info: string) =>
  errorHandler(err, vm, info)
