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
            <a-table :columns="columns" :dataSource="currentList" :loading="spinning" tip="操作中...">
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
      spinning: true,
      categoryId: 1,
      currentList: [],
      openKeys: ["sub1"],
      columns
    };
  },
  mounted() {
    this.getCurrentList();
  },
  methods: {
    ...mapActions("article", ["DELETE_ARTICLE", "CATEGORY_ARTICLE_LIST"]),
    onOpenChange(e) {
      this.categoryId = e.key;
      this.spinning=true;
      this.getCurrentList();

    },
    getCurrentList() {
      let data = {
        page: 1,
        pageSize: 10,
        categoryId: this.categoryId
      };
      this.CATEGORY_ARTICLE_LIST({ data }).then(res => {
        this.spinning = false;

      });
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
  computed: {
    ...mapState("article", ["articleClassify", "categoryArticleList"]),
    ...mapGetters("article", ["disposeCategoryArticleList"])
  },
  watch: {
    disposeCategoryArticleList() {
      this.currentList = this.disposeCategoryArticleList;
      //表格行设置唯一的key
      this.currentList.map(item => (item.key = item.id));
    }
  }
};
</script>

<style lang="css" scoped>
#user{
  margin-top: 16px;
}
</style>
