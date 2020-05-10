import {
  LOGIN_DIALOG,
  LOGIN_OUT,
  SET_USER
} from '@/store/mutation-types.js';
const state = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || '',
  isLogin: false
}

// getters
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {
  [SET_USER](state, payload) {
    localStorage.setItem('userInfo', payload)
    state.userInfo = JSON.parse(payload)
  },
  //退出
  [LOGIN_OUT](state) {
    localStorage.removeItem('userInfo')
    state.userInfo = ''
  },
  //是否显示登陆弹窗
  [LOGIN_DIALOG](state,payload) {
    state.isLogin = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
