<template lang="html">
  <div class="hot-article v-model v-shadow">
    <div class="headline-title">
      <h5>近期热门 - 点击最多</h5>
    </div>
    <div class="hot-article-list">
      <ul>
        <li v-for="row in hotArticleList" :key="row.id">
          <router-link :to="{ name: 'detail', params: { id: row.id } }">{{
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
      this.post("/article/hotList").then(res => {
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
.hot-article{

}
.hot-article-list {
  ul{
    margin-bottom: 0;
  }
 
  li {
    font-size: 15px;
  }
  a {
    display: block;
    color: #333;
    line-height: 30px;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
}
</style>
