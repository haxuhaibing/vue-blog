<template lang="html">
  <div class="category-container">
    <div class="container">
      <a-row :gutter="16">
        <a-col :lg="{ span: 18 }">
          <div class="category-nav v-model v-shadow">
            <div class="category-nav-title">
              分类：
            </div>
            <div class="category-nav-list">
              <ul>
                <li
                  v-for="item in categoryList"
                  :key="item.id"
                  @click="onCate(item.tag, item.id)"
                  :class="[categoryId == item.id ? 'active' : '']"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="v-model v-shadow cate-list-container">
            <h2>文章列表</h2>
            <a-spin tip="加载中..." :spinning="cateListLoading">
              <div class="cate-list">
                <div
                  class="article-list-item"
                  v-for="row in currentList"
                  :key="row.id"
                >
                  <h2 class="title">
                    <router-link
                      :to="{ name: 'detail', params: { id: row.id } }"
                      >{{ row.title }}</router-link
                    >
                  </h2>
                  <div class="desc" v-html="row.contents" v-highlight></div>
                  <div class="tags-date">
                    <div class="tags">
                      <span>{{ row.tags }}</span>
                    </div>
                    <div class="date">{{ row.time }}</div>
                  </div>
                </div>
                <a-empty v-if="isData" description="暂无更多" />
              </div>
            </a-spin>
          </div>
          <a-pagination v-model="currentPage" :total="total" :hideOnSinglePage="true" />
        </a-col>
        <a-col :lg="{ span: 6 }">
          <HotArticle></HotArticle>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import HotArticle from "@/components/HotArticle";
export default {
  name: "category",
  data() {
    return {
      currentPage: 1,
      setps: 4,
      categoryList: [],
      articleList: [],
      currentList: [],
      total: 0,
      cateListLoading: true,
      categoryId: "",
      isPagination: true,
      isData: false
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.getCategory();
    },
    //获取文章列表
    getArticleList() {
      this.cateListLoading = true;
      this.post("/article/list", {
        cate_id: this.categoryId
      }).then(res => {
        console.log("文章列表", res);
        if (res.code == 200) {
          if (res.data) {
            this.articleList = res.data;
            this.total = this.articleList.length;
          } else {
            this.isData = true;
            this.articleList = [];
          }
          this.cateListLoading = false;
          this.getPaginationList();
        }
      });
    },
    //获取分类
    getCategory() {
      this.post("cate/cateType").then(res => {
        if (res.code == 200) {
          this.categoryList = res.data;
          //解析当前url分类
          for (let item of res.data) {
            if (item.tag == this.$route.params.tag) {
              this.categoryId = item.id;
              break;
            }
          }
          //获取的列表依赖分类
          this.getArticleList();
        }
      });
    },
    getPaginationList() {
      let currentSize = this.currentPage - 1;
      let setps = this.setps;
      let result = this.articleList.slice(
        currentSize * setps,
        setps * (currentSize + 1)
      );
      this.currentList = result;
    },
    onCate(tag, id) {
      this.isData = false;
      this.categoryId = id;
      this.currentList = [];
      this.cateListLoading = true;
      this.$router.push({ path: `/category/${tag}` });
    },
    handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getPaginationList();
    }
  },
  watch: {
    $route() {
      this.init();
    }
  },
  components: {
    HotArticle
  }
};
</script>

<style lang="scss" scoped>
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
  margin-top: 16px;
}
.category-nav-title {
  font-size: 1rem;
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
    cursor: pointer;
    a {
      color: #666;
    }
    &:hover,
    &.active {
      color: #409eff;
    }
  }
}
.cate-list {
  min-height: 100px;
}
.el-pagination {
  margin-top: 1.5rem;
}
.cate-list-container {
  margin-top: 16px;
}
</style>
