<template lang="html">
  <div id="user">
    <div class="container">
      <a-row :gutter="16">
        <a-col :lg="{ span: 6 }">
          <div class="user-nav">
            <a-menu
              mode="inline"
              :openKeys="openKeys"
              @openChange="onOpenChange"
            >
              <a-sub-menu key="sub1">
                <span slot="title"
                  ><a-icon type="appstore" /><span>文章管理</span></span
                >
                <a-menu-item v-for="item in cates" :key="item.id">{{
                  item.name
                }}</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </div></a-col
        >
        <a-col :lg="{ span: 18 }">
          <router-view />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      rootSubmenuKeys: ["sub1"],
      openKeys: ["sub1"],
      cates: []
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    getCategory() {
      this.post("cate/cateType").then(res => {
        console.log("cate", res);
        if (res.code == 200) {
          this.cates = res.data;
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
#user{
  margin-top: 16px;
}
</style>
