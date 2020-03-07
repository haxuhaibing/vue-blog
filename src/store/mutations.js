// import router from '@/router'
export default {
  SET_USER(state, payload) {
    localStorage.setItem('userInfo', payload)
    this.state.userInfo = JSON.parse(payload)
  },
  //退出
  LOGIN_OUT() {
    localStorage.removeItem('userInfo')
    this.state.userInfo = ''
  },
  LOGIN_STATUS(state, payload) {
    this.state.isLogin = payload
  },

}
