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
                :class="categoryId == item.id ? 'active' : ''"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="v-shadow cate-list-container ">
            <div class="cate-list">
              <div
                v-if="paginationList.length == 0"
                style="padding:15px 0"
              >
                <a-empty description="暂无数据" />
              </div>
              <div v-else>
                <div
                  class="article-list-item"
                  v-for="row in paginationList"
                  :key="row.id"
                >
                  <a-skeleton :loading="loadding" active>
                    <h2>
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
                  </a-skeleton>
                </div>
              </div>
            </div>
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
      total: 0,
      categoryId: "1",
      isPagination: true,
      paginationList: [""],
      loadding: true
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {},
  computed: {
    ...mapState("article", ["articleClassify", "categoryArticleList"]),
    ...mapGetters("article", ["disposeCategoryArticleList"])
  },
  watch: {
    disposeCategoryArticleList() {
      this.paginationList = this.disposeCategoryArticleList;
    }
  },
  methods: {
    ...mapActions("article", ["ARTICLE_CATEGORY", "CATEGORY_ARTICLE_LIST"]),
    //获取分类
    getCategory() {
      this.ARTICLE_CATEGORY().then(res => {
        //获取当前分类id
        for (let item of this.articleClassify) {
          if (item.tag == this.$route.params.tag) {
            this.categoryId = item.id;
            break;
          }
        }
        let data = {
          page: 1,
          pageSize: 10,
          categoryId: this.categoryId
        };
        this.CATEGORY_ARTICLE_LIST({ data }).then(res => {
          this.loadding = false;
        });
      });
    },
    //获取分页
    onChangePagination(page, pageSize) {
      this.paginationList = this.disposeArticleList.slice(
        pageSize * (page - 1),
        pageSize * page
      );
    },
    //change category
    onCategory(tag, id) {
      this.paginationList = [""]; //为了显示骨架屏
      this.categoryId = id;
      this.loadding = true;
      let data = {
        page: 1,
        pageSize: 10,
        categoryId: this.categoryId
      };
      this.CATEGORY_ARTICLE_LIST({ data }).then(res => {
        this.loadding = false;
      });
    },
    onShowSizeChange(current, size) {
      console.log(current, size);
    }
  },
  components: {
    HotArticle
  }
};
</script>

<style lang="scss" scoped>
.category-container {
  padding: 0 15px;
}
.cate-list-container {
  margin-top: 16px;
  background: #fff;
  min-height: 100px;
}
.article-list-item {
  padding: 16px 16px;
  border-bottom: 1px solid #f4f4f4;

  h2 {
    font-size: 1.2rem;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 500;
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

.category-pagination {
  margin-top: 15px;
}
</style>
