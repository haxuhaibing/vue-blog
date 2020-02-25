<template lang="html">
  <div class="index-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <div class="article-list">
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
        </div>
        <div class="col-lg-3" style="margin-top:15px;">
          <HotArticle></HotArticle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotArticle from "@/components/HotArticle.vue";
export default {
  name: "home",
  data() {
    return {
      articleList: []
    };
  },
  created() {
    this.getArticleList();
  },
  mounted() {
 
  },
  methods: {
    getArticleList() {
      this.post("/article/list").then(res => {
        console.log("文章列表", res);
        if (res.code == 200) {
          this.articleList = res.data;
        }
      });
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
</style>
