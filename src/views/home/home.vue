<template lang="html">
  <div class="index-content">
    <div class="container">
      <a-row :gutter="16">
        <a-col :lg="{ span: 18 }">
          <div class="article-list v-model v-shadow">
            <div v-if="isDisposeList" style="padding-top:20px;">
              <a-empty>
                <span slot="description">
                  暂无数据
                </span>
              </a-empty>
            </div>

            <div
              class="article-list-item"
              v-for="row in paginationList"
              :key="row.id"
            >
              <a-skeleton :loading="loading" active>
                <h2 class="title">
                  <router-link
                    :to="{ name: 'detail', params: { href: row.href } }"
                  >
                    {{ row.title }}
                  </router-link>
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

          <div class="mt15">
            <a-pagination
              v-model="current"
              :defaultPageSize="setps"
              :total="total"
              @change="onChangePagination"
              showLessItems
              hideOnSinglePage
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
import HotArticle from "@/components/HotArticle.vue";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      isDisposeList: false,
      loading: true,
      current: 1,
      setps: 5,
      total: 0,
      paginationList: []
    };
  },
  computed: {
    ...mapState("article", ["articleList"]),
    ...mapGetters("article", ["disposeArticleList"])
  },
  watch: {},
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions("article", ["ARTICLE_LIST"]),
    initData() {
      this.getArticleList();
    },
    //获取文章列表
    getArticleList(page) {
      this.loading = true;
      let data = {
        page: page || this.current,
        pageSize: this.setps
      };
      this.ARTICLE_LIST({ data }).then(res => {
        this.paginationList = this.disposeArticleList;
        this.loading = false;
        this.total = this.articleList.total;
      });
    },
    //获取当前分页列表
    onChangePagination(page) {
      this.getArticleList(page);
    },
    //获取分页数据
    initArticleList() {}
  },
  components: {
    HotArticle
  }
};
</script>

<style lang="scss" scoped="">
.index-content {
  padding: 0 16px;
}
.article-list {
  margin-top: 16px;
  padding-top: 0;
}

.article-list-item {
  padding: 16px 0;
  border-bottom: 1px solid #f4f4f4;
  .title {
    font-size: 1.2rem;
    line-height: 1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    font-size: 13px;
    color: #3d3d3d;
  }
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
  .desc {
    background: #f8f8f8;
  }
}
</style>
