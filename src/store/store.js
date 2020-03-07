import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const state = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || '',
  isLogin: false
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
