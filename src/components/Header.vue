<template lang="html">
  <header>
    <div class="container">
      <a-row type="flex" justify="space-between" align="middle">
        <router-link :to="{ name: 'home' }">
          <img class="logo" src="@/assets/images/logo.png" alt="" />
        </router-link>
        <div class="header-right">
          <ul class="nav">
            <li><router-link to="/home">首页</router-link></li>
            <li>
              <router-link to="/category">
                分类
              </router-link>
            </li>
            <li>
              <router-link to="/about">关于我</router-link>
            </li>
            <li v-if="!userInfo" @click="onLogin">
              登录
            </li>
          </ul>
          <a-dropdown v-if="userInfo">
            <a-avatar
              class="ant-dropdown-link"
              :size="30"
              :src="userInfo.avatar"
            ></a-avatar>
            <a-menu slot="overlay">
              <a-menu-item>
                <router-link to="/user">个人主页</router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/publish">发布文章</router-link>
              </a-menu-item>

              <a-menu-item>
                <div @click="LOGIN_OUT">退出</div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-row>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return { search: "" };
  },
  mounted() {

  },
  methods: {
    ...mapMutations(["LOGIN_OUT"]),
    onLogin() {
      this.$store.commit("LOGIN_STATUS", true);
    }
  },
  computed: {
    //1.普通函数获取
    // userInfo() {
    //   return this.$store.state.userInfo;
    // }

    //3.借助mapState对象展开运算符
    ...mapState({
      userInfo: state => state.userInfo
    })
  }
};
</script>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid #e7e7e7;
  padding: 8px 16px;
  background-color: #fff;
}

.logo {
  height: 40px;
}
.header-right {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.nav {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;

  li {
    margin-left: 16px;
    line-height: 40px;
    cursor: pointer;
    font-size: 1rem;
  }
  a {
    color: #333;
  }
}
.ant-avatar {
  margin-left: 16px;
}
</style>
