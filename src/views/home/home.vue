<template lang="html">
  <div>
    <div class="index-content">
      <div class="container">
        <a-row :gutter="16">
          <a-col :lg="{ span: 18 }">
            <div class="article-list v-model v-shadow">
              <div
                class="article-list-item"
                v-for="row in currentList"
                :key="row.id"
              >
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
              </div>
            </div>
          </a-col>
          <a-col :lg="{ span: 6 }">
            <HotArticle></HotArticle>
          </a-col>
        </a-row>
        <div class="mt15">
          <a-pagination
            v-model="current"
            :defaultPageSize="setps"
            :total="total"
            @change="onChangePagination"
            showLessItems
             
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import SwiperCss from "swiper/css/swiper.css";
import HotArticle from "@/components/HotArticle.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      current: 1,
      setps: 10,
      total: 0,
      currentList: []
    };
  },
  computed: mapState({
    articleList: state => state.article.articleList
  }),
  mounted() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.$store.dispatch("article/setArticle");
    },
    onChangePagination(page, pageSize) {
      let result = this.articleList.slice(page - 1, this.setps);
      this.currentList = result;
    }
  },
  watch: {
    articleList() {
      let result = this.articleList.slice(this.current - 1, this.setps);
      this.total = this.articleList.length;
      this.currentList = result;
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
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
}
</style>
