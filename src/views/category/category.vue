<template lang="html">
  <div class="category-container">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <div class="category-nav">
            <div class="category-nav-title">
              <h5>分类：</h5>
            </div>
            <div class="category-nav-list">
              <ul>
                <li
                  v-for="item in categoryList"
                  :key="item.id"
                  @click="onCate(item.id)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="headline-title">
            <h4>文章列表</h4>
          </div>
          <div class="cate-list">
            <div
              class="article-list-item"
              v-for="row in articleList"
              :key="row.id"
            >
              <h2 class="title">
                <router-link :to="{ name: 'detail', params: { id: row.id } }">{{
                  row.title
                }}</router-link>
              </h2>
              <div class="desc" v-html="row.contents" v-highlight></div>
              <div class="tags-date">
                <div class="tags">
                  <span>{{ row.tags }}</span>
                </div>
                <div class="date">{{ row.time }}</div>
              </div>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
        <div class="col-lg-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "category",
  data() {
    return {
      currentPage: 1,
      categoryList: [],
      articleList: [],
      total: 30,
      categoryId: this.$route.params.id
    };
  },
  created() {
    this.getCategory();
    this.getArticleList();
  },
  mounted() {},
  methods: {
    getArticleList() {
      this.post("/article/list", {
        cate_id: this.categoryId
      }).then(res => {
        console.log("文章列表", res);
        if (res.code == 200) {
          this.articleList = res.data;
        }
      });
    },
    getCategory() {
      this.post("cate/cateType").then(res => {
        if (res.code == 200) {
          this.categoryList = res.data;
        }
      });
    },
    onCate(id) {
      this.$router.push({ path: `/category/${id}` });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.category-container {
  margin-top: 15px;
}
.article-list-item {
  padding: 15px 0;
  border-bottom: 1px solid #f4f4f4;
  .title {
    font-size: 24px;
    a {
      color: #333;
    }
  }
  .tags-date {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tags span {
    display: inline-block;
    white-space: nowrap;
    background-color: #eff3f6;
    border-radius: 3px;
    padding: 2px 10px;
    font-size: 14px;
    color: #3d3d3d;
  }
}
.category-nav {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  border-bottom: 1px solid #f1f1f1;
}
.category-nav-title {
}
.category-nav-list {
  flex: 1;
  ul {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
  }
  li {
    margin-left: 16px;
    a {
      color: #666;
    }
  }
}
</style>
