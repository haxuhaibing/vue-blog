<template lang="html">
  <header>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <img class="logo" src="@/assets/logo.png" alt="" />
        </div>
        <div class="col-9 ">
          <div class="row justify-content-end">
            <div class="col-md-auto">
              <ul class="nav">
                <li>首页</li>
                <li>分类</li>
                <li>关于我</li>
                <li>
                  <router-link to="/login">登录</router-link>
                </li>
              </ul>
            </div>
            <div class="col-md-auto" v-if="true">
              <div class="dropdown">
                <img class="user-avatar" :src="userInfo.avatar" alt="" />
                <div class="dropdown-menu">
                  <div class="dropdown-item"></div>
                  <div class="dropdown-item">资料与账户</div>
                  <div class="dropdown-item">退出</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data(){
    return{}
  },
  mounted(){

  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid #e7e7e7;
}
.container {
  padding: 10px 15px;
}
.logo {
  height: 40px;
}
.nav {
  li {
    margin-left: 16px;
    line-height: 40px;
    cursor: pointer;
  }
  a {
    color: #333;
  }
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
