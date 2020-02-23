<template lang="html">
  <div class="hot-article">
    <div class="headline-title">
      <h5>近期热门 - 点击最多</h5>
    </div>
    <div class="hot-article-list">
      <ul>
        <li v-for="row in hotArticleList" :key="row.id">
          <router-link :to="{ name: 'detail', params: { id: row.id } }" >{{
            row.title
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotArticleList: {}
    };
  },
  created() {
    this.getHotArticleList();
  },
  mounted() {},
  methods: {
    getHotArticleList() {
      this.post("/article/hotList.php").then(res => {
        console.log("热门文章", res);
        if (res.code == 200) {
          this.hotArticleList = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.hot-article-list {
  li {
    line-height: 1.8;
  }
  a {
    color: #333;
  }
}
</style>
