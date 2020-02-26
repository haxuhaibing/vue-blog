<template lang="html">
  <div class="user-article">
    <el-table
      :data="articleList"
      border
      type="index"
      :index="indexMethod"
      style="width: 100%"
    >
      <el-table-column prop="title" label="标题" width="350"> </el-table-column>
      <el-table-column prop="tags" label="分类" width="120"> </el-table-column>
      <el-table-column prop="time" label="时间" width="220"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="onView(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="onEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="onDelete(scope)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: []
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    indexMethod(index) {
      return index;
    },
    getArticleList() {
      this.post("/article/list").then(res => {
        console.log("文章列表", res);
        if (res.code == 200) {
          this.articleList = res.data;
        }
      });
    },
    onView(row) {
      this.$router.push({
        path: `/detail/${row.id}`
      });
    },
    onEdit(row) {
      this.$router.push({
        path: `/publish?edit=${row.id}`
      });
    },
    onDelete(row) {
      let id = row.row.id;
      let index = row.$index;
      this.post("/article/delete", {
        id: id
      }).then(response => {
        this.articleList.splice(index, 1);
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: "success"
          });
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
