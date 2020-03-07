<template lang="html">
  <div class="user-article v-model v-shadow">
    <a-table :columns="columns" :dataSource="articleList">
      <a slot="action" slot-scope="text, record, index" href="javascript:;">
        <a @click="() => edit(record, index)">编辑</a>
        <a-divider type="vertical" />
        <a @click="() => del(record, index)">删除</a>
      </a>
    </a-table>
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
export default {
  data() {
    return {
      columns,
      articleList: []
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.post("/article/list").then(res => {
        console.log("文章列表", res);
        if (res.code == 200) {
          let data = res.data;
          let arryNew = [];
          data.map((item, index) => {
            arryNew.push(Object.assign({}, item, { key: index }));
          });
          this.articleList = arryNew;
        }
      });
    },
    edit(record, index) {
      this.$router.push({
        path: `/publish?edit=${record.id}`
      });
    },
    del(record, index) {
      let id = record.id;
      this.post("/article/delete", {
        id: id
      }).then(response => {
        this.articleList.splice(index, 1);
        if (response.code == 200) {
          this.$message.success(response.msg);
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

<style lang="css" scoped></style>
