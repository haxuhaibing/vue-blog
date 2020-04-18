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
  setUser(state, payload) {
    localStorage.setItem('userInfo', payload)
    state.userInfo = JSON.parse(payload)
  },
  //退出
  loginOut(state) {
    localStorage.removeItem('userInfo')
    state.userInfo = ''
  },
  //是否显示登陆弹窗
  loginDialog(state, payload) {
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
