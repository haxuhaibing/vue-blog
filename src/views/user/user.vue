<template lang="html">
  <div id="user">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="user-nav">
            <el-row class="tac">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>Dashboard</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">分析页</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>文章管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">分类</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>资料与账号</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">资料设置</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-row>
          </div>
        </div>
        <div class="col-lg-9">
           <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="css" scoped>
#user{
  margin-top: 16px;
}
</style>
