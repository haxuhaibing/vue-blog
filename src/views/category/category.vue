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
                  v-for="item in articleClassify"
                  :key="item.id"
                  @click="onCategory(item.tag, item.id)"
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
                  v-for="row in pageList"
                  :key="row.id"
                >
                  <h2 class="title">
                    <router-link
                      :to="{ name: 'detail', params: { href: row.href } }"
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
          <div class="category-pagination">
            <a-pagination
              v-model="currentPage"
              :total="total"
              :defaultPageSize="setps"
              :hideOnSinglePage="false"
              @change="onChangePagination"
            />
          </div>
        </a-col>
        <a-col :lg="{ span: 6 }">
          <HotArticle></HotArticle>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HotArticle from "@/components/HotArticle";
export default {
  name: "category",
  data() {
    return {
      currentPage: 1,
      setps: 2,
      currentList: [],
      total: 0,
      cateListLoading: true,
      categoryId: "",
      isPagination: true,
      isData: false,
      pageList: []
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {},
  methods: {
    //获取文章列表
    articleFilterList() {
      this.currentList = this.articleList.filter(
        item => item.cate_id == this.categoryId
      );
      this.total = this.currentList.length;
      this.cateListLoading = false;
      this.onChangePagination();
    },
    //获取分类
    getCategory() {
      if (this.articleClassify.length <= 0) {
        this.$store.dispatch("article/setArticleClassify");
      }

      for (let item of this.articleClassify) {
        if (item.tag == this.$route.params.tag) {
          this.categoryId = item.id;
          break;
        }
      }
      this.articleFilterList();
    },
    //获取分页
    onChangePagination(current, size) {
      let currentSize = this.currentPage - 1;
      let setps = this.setps;
      let result = this.currentList.slice(
        currentSize * setps,
        setps * (currentSize + 1)
      );
      this.pageList = result;
    },
    //click category
    onCategory(tag, id) {
      this.isData = false;
      this.categoryId = id;
      this.pageList = [];
      this.cateListLoading = true;
      this.$router.push({ path: `/category/${tag}` });
      this.articleFilterList();
    }
  },
  computed: mapState({
    articleList: state => state.article.articleList,
    articleClassify: state => state.article.articleClassify
  }),
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
.category-pagination{
  margin-top: 15px;
}
</style>
