import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
  isLoading: false,
  headTitle: '网吧特权'
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
