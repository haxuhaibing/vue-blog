<template lang="html">
  <div id="user">
    <div class="container">
      <a-row :gutter="16">
        <a-col :lg="{ span: 6 }">
          <div class="user-nav">
            <a-menu
              @click="onOpenChange"
              :defaultSelectedKeys="['1']"
              :openKeys.sync="openKeys"
              mode="inline"
            >
              <a-sub-menu key="sub1">
                <span slot="title"
                  ><a-icon type="appstore" /><span>文章管理</span></span
                >
                <a-menu-item v-for="item in articleClassify" :key="item.id">{{
                  item.name
                }}</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </div></a-col
        >
        <a-col :lg="{ span: 18 }">
          <div class="user-article v-model v-shadow">
            <a-spin tip="操作中..." :spinning="spinning"> </a-spin>
            <a-table :columns="columns" :dataSource="currentList">
              <a
                slot="action"
                slot-scope="text, record, index"
                href="javascript:;"
              >
                <a @click="() => edit(record, index)">编辑</a>
                <a-divider type="vertical" />
                <a @click="() => del(record, index)">删除</a>
              </a>
            </a-table>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "标题",
    width: 360,
    dataIndex: "title",
    key: "title"
  },
  { title: "分类", width: 100, dataIndex: "tags", key: "tags" },
  { title: "时间", width: 160, dataIndex: "time", key: "time" },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 120,
    scopedSlots: { customRender: "action" }
  }
];
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "userarticle",
  data() {
    return {
      spinning: false,
      classify: 1,
      currentList: [],
      current: ["note"],
      openKeys: ["sub1"],
      columns
    };
  },
  mounted() {
    this.getCurrentList();
  },
  methods: {
    ...mapActions("article", ["DELETE_ARTICLE"]),
    onOpenChange(e) {
      this.classify = e.key;
    },
    getCurrentList() {
      this.currentList = this.articleList.filter(
        item => item.cate_id == this.classify
      );
      //表格行设置唯一的key
      this.currentList.map(item => (item.key = item.id));
    },
    edit(record, index) {
      this.$router.push({
        path: `/publish?href=${record.href}`
      });
    },
    del(record, index) {
      let mes = this.$message.loading("处理中...", 0);
      this.DELETE_ARTICLE({ record }).then(res => {
        setTimeout(mes, 10);
        this.$message.success("操作成功！", 1);
      });
    }
  },
  computed: mapState("article", ["articleList", "articleClassify"]),
  watch: {
    classify() {
      this.getCurrentList();
    },
    articleList() {
      this.getCurrentList();
    }
  }
};
</script>

<style lang="css" scoped>
#user{
  margin-top: 16px;
}
</style>
