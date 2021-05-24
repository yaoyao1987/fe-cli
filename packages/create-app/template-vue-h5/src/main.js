import '@babel/polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
// 全局常量
import * as constants from '@/constants'
// 枚举
import enums from '@/enums'

import App from './App.vue'

import { Toast, Dialog } from 'vant'

import titleMixin from './mixins/title'

// vant引入本地icon
import 'vant/lib/icon/local.css'

import './assets/styles/sw.less'
import './assets/scripts/resize'

import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Vue.config.productionTip = false

// sentry前端日志跟踪
window.$Raven = Raven

const ravenUrl = process.env.NODE_ENV === 'development' ? 'http://e13fd30c247c44438eea79c870503e8a@192.168.9.22/3' : 'https://52d6c8d0e1344252bdf7c064b03a3e15@sentry.2333you.com/5'
Raven
  .config(ravenUrl, {
    release: '1.1.0'
  })
  .addPlugin(RavenVue, Vue)
  .install()

// 测试环境加上vconsole
if (process.env.NODE_ENV === 'development') {
  let VConsole = require('vconsole')
  var vconsole = new VConsole()
}

// mixin for handling title
Vue.mixin(titleMixin)

window.Toast = Toast
window.Dialog = Dialog
Vue.use(Dialog)

// 挂载到Vue实例上面
Vue.prototype.GLOBAL = { ...constants, enums }

sync(store, router)

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING_STATUS', { isLoading: true })
  // 路由拦截
  next()
})

router.afterEach(function (to) {
  Dialog.close()
  store.commit('UPDATE_LOADING_STATUS', { isLoading: false })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
