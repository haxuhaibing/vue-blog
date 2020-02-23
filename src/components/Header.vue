<template lang="html">
  <header>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <router-link :to="{ name: 'home' }">
            <img class="logo" src="@/assets/images/logo.png" alt="" />
          </router-link>
        </div>
        <div class="col-9 ">
          <div class="row justify-content-end">
            <div class="col-auto">
              <ul class="nav">
                <li>首页</li>
                <li>
                  <router-link to="/publish">
                    分类
                  </router-link>
                </li>
                <li>关于我</li>
                <li v-if="!userInfo">
                  <router-link to="/login">登录</router-link>
                </li>
              </ul>
            </div>
            <div class="col-auto" v-if="userInfo">
              <div class="dropdown">
                <img
                  class="user-avatar"
                  :src="userInfo.avatar"
                  alt=""
                  @click="isUserDropdown = !isUserDropdown"
                />
                <div
                  class="dropdown-menu"
                  v-show="isUserDropdown"
                  @click="isUserDropdown = !isUserDropdown"
                >
                  <div class="dropdown-item"></div>
                  <div class="dropdown-item">资料与账户</div>
                  <div class="dropdown-item" @click="LOGIN_OUT">退出</div>
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
  data() {
    return {
      isUserDropdown: false
    };
  },
  mounted() {},
  methods: {
    ...mapMutations(["LOGIN_OUT"]),
    ...mapActions([])
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
  background: #f8f8f8;
  display: block;
}
.dropdown-menu {
  display: block;
}
</style>
