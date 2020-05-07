<template lang="html">
  <div class="category-container">
    
    <div class="container">
      <a-row :gutter="16">
        <a-col :lg="{ span: 18 }">
          <div class="category-nav">
            <ul class="category-nav-list">
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
          <div class="  v-shadow cate-list-container pt-0">
            <a-spin tip="加载中..." :spinning="cateListLoading">
              <a-empty
                style="padding:20px 0"
                v-if="paginationList.length == 0"
                description="无数据"
              />

              <div class="cate-list">
                <div
                  class="article-list-item"
                  v-for="row in paginationList"
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
              </div>
            </a-spin>
          </div>
          <div class="category-pagination">
            <a-pagination
              v-model="currentPage"
              :total="total"
              :defaultPageSize="setps"
              :hideOnSinglePage="true"
              @change="onChangePagination"
              @showSizeChange="onShowSizeChange"
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
import { mapState, mapActions, mapGetters } from "vuex";
import HotArticle from "@/components/HotArticle";
export default {
  name: "category",
  data() {
    return {
      currentPage: 1,
      setps: 10,
      currentList: [],
      total: 0,
      cateListLoading: true,
      categoryId: "",
      isPagination: true,
      paginationList: []
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {},
  methods: {
    //获取文章分类列表
    articleFilterList() {
      this.currentList = this.articleList.filter(
        item => item.cate_id == this.categoryId
      );
      this.total = this.currentList.length;
      this.cateListLoading = false;
      this.paginationList = this.currentList.slice(0, this.setps);
    },
    //获取分类
    getCategory() {
      this.$store.dispatch("article/setArticleClassify").then(res => {
        //获取当前分类id
        for (let item of this.articleClassify) {
          if (item.tag == this.$route.params.tag) {
            this.categoryId = item.id;
            break;
          }
        }

        //获取文章列表
        this.$store.dispatch("article/setArticle").then(res => {
          this.articleFilterList();
        });
      });
    },
    //获取分页
    onChangePagination(current, size) {
      let result = this.currentList.slice(
        (current - 1) * this.setps,
        this.setps * current
      );
      this.paginationList = result;
    },
    //click category
    onCategory(tag, id) {
      this.isData = false;
      this.categoryId = id;
      this.paginationList = [];
      this.cateListLoading = true;
      this.$router.push({ path: `/category/${tag}` });
      this.articleFilterList();
    },
    onShowSizeChange(current, size) {
      console.log(current, size);
    }
  },
  computed: {
    ...mapState("article", ["articleClassify"]),
    ...mapGetters("article", {
      articleList: "doneArticleList"
    })
  },
  components: {
    HotArticle
  }
};
</script>

<style lang="scss" scoped>
.article-list-item {
  padding: 16px 16px;
  border-bottom: 1px solid #f4f4f4;

  .title {
    font-size: 1.2rem;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 500;
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
  &:hover {
    background: rgba(245, 245, 245, 0.6);
    cursor: pointer;
  }
  &:last-child {
    border-bottom: none;
  }
}
.category-nav {
  display: flex;
  margin-top: 16px;
}
.category-nav-title {
  font-size: 1rem;
}
.category-nav-list {
  display: flex;
  li {
    margin-right: 1.2rem;
    cursor: pointer;
    background: #fff;
    border-radius: 23px;
    padding: 1px 10px;

    &.active {
      background: var(--primary);
      color: #fff !important;
    }
    &:hover {
      color: var(--primary);
    }
  }
}

.el-pagination {
  margin-top: 1.5rem;
}
.cate-list-container {
  margin-top: 16px;
  background: #fff;
}
.category-pagination {
  margin-top: 15px;
}
</style>
