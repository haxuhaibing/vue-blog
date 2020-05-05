<template lang="html">
  <div style="height:57px;">
    <header class="navbar-header">
      <div class="container">
        <a-row type="flex" justify="space-between" align="middle">
          <router-link :to="{ name: 'home' }">
            <img class="logo" src="@/assets/images/logo.png" alt="" />
          </router-link>
          <ul class="header-nav">
            <li :class="this.$route.name == 'home' ? 'active' : ''">
              <router-link to="/home">首页</router-link>
            </li>
            <li :class="this.$route.name == 'category' ? 'active' : ''">
              <router-link to="/category">
                分类
              </router-link>
            </li>
            <li :class="this.$route.name == 'about' ? 'active' : ''">
              <router-link to="/about">关于我</router-link>
            </li>
          </ul>
          <div class="navbar-user">
            <div v-if="!userInfo" @click="onLogin" class="navbar-btn-login">
              登录
            </div>
            <!-- <div class="navbar-user-pulish" v-if="userInfo">
              <router-link to="/publish">
                <a-button type="primary" size="small" ghost
                  >写文章</a-button
                ></router-link
              >
            </div> -->
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
                  <div @click="onLoginOut">退出</div>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </a-row>
      </div>
    </header>
  </div>

</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      search: ""
    };
  },
  mounted() {

  },
  methods: {
    onLoginOut() {
      this.$store.commit("user/loginOut");
    },
    onLogin() {
      this.$store.commit("user/loginDialog", true);
    }
  },
  computed: {
    //1.普通函数获取
    // userInfo() {
    //   return this.$store.state.userInfo;
    // }

    ...mapState({
      userInfo: state => state.user.userInfo
    })
  }
};
</script>

<style lang="scss" scoped>
.navbar-header {
  border-bottom: 1px solid #e7e7e7;
  padding: 8px 16px;
  background-color: #fff;
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 999;
}
.navbar-btn-login{
  cursor: pointer;
  &:hover{
    color: var(--primary);
  }
}
.navbar-user {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.logo {
  height: 32px;
}
.header-left {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.header-nav {
  flex: 1;

  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  margin-left: 1rem;

  li {
    margin-left: 1.6rem;
    line-height: 40px;
    cursor: pointer;
    font-size: 1rem;
    a {
      color: #333;
    }
    &.active {
      a {
        color: var(--primary);
      }
    }
  }
}
.ant-avatar {
  margin-left: 16px;
}
</style>
