<template lang="html">
  <div>
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
                v-for="row in currentPaginationList"
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
  </div>
</template>

<script>
// import Swiper from "swiper";
// import SwiperCss from "swiper/css/swiper.css";
import HotArticle from "@/components/HotArticle.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import { cutCharacterString } from "@/utils/common.js";

export default {
  name: "home",
  data() {
    return {
      isDisposeList: false,
      loading: true,
      current: 1,
      setps: 10,
      total: 0,
      currentPaginationList: [],
      disposeList: ["", "", "", "", "", "", "", "", "", "", ""]
    };
  },
  // computed: mapState({
  //   articleList: state => state.article.articleList
  // }),
  computed: {
    //带命名空间的绑定函数v1
    // ...mapState({
    //   articleList: state => state.article.articleList
    // })

    //优化版
    //第一个参数是命名空间的路径v2
    // ...mapState("article", {
    //   articleList: state => state.articleList
    // }),
    //继续优化=>
    //    ...mapState("article", ["articleList"]),
    ...mapGetters("article", {
      articleList: "doneArticleList"
    })
  },
  watch: {
    articleList() {
      this.initCurrentList();
    }
  },
  mounted() {
    this.getArticleList();
    // console.log(this.$store.getters.article);
  },
  methods: {
    getArticleList() {
      if (this.articleList.length <= 0) {
        this.$store.dispatch("article/setArticle").then(res => {
          //没有数据
          if (res.length == 0) {
            this.isDisposeList = true;
          }
          //
          this.disposeList = res.map(item => ({
            ...item,
            contents: cutCharacterString(item.contents)
          }));

          this.loading = false;
          this.initCurrentList();
        });
      } else {
        this.disposeList = this.articleList.map(item => ({
          ...item,
          contents: cutCharacterString(item.contents)
        }));
        this.loading = false;
        this.initCurrentList();
      }
    },
    onChangePagination(page, pageSize) {
      let result = this.disposeList.slice(
        (page - 1) * pageSize,
        pageSize * page
      );
      this.currentPaginationList = result;
    },
    //获取分页数据
    initCurrentList() {
      let result = this.disposeList.slice(0, this.setps);
      this.total = this.disposeList.length;
      this.currentPaginationList = result;
    }
  },
  components: {
    HotArticle
  }
};
</script>

<style lang="scss" scoped>
.index-swiper {
  width: 100%;
  height: 300px;
  .swiper-slide {
    background: pink;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
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
}
</style>
