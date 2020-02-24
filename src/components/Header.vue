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
          <div class="row justify-content-end align-items-center">
            <div class="col-auto">
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
                <li v-if="!userInfo">
                  <router-link to="/login">登录</router-link>
                </li>
              </ul>
            </div>
            <div class="col-auto" v-if="userInfo">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-avatar :size="30" :src="userInfo.avatar"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    ><router-link to="/publish"
                      >发布文章</router-link
                    ></el-dropdown-item
                  >
                  <el-dropdown-item>资料与账户</el-dropdown-item>
                  <el-dropdown-item
                    ><span @click="LOGIN_OUT">退出</span></el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ...mapMutations(["LOGIN_OUT"])
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
  padding: 8px 0;
}

.logo {
  height: 40px;
}
.nav {
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
.el-avatar > img {
  cursor: pointer !important;
}
</style>
