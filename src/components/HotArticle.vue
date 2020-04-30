<template lang="html">
  <div class="hot-article  v-shadow">
    <div class="v-headline">
      <!-- <svg class="icon-recommend" aria-hidden="true">
        <use xlink:href="#icon-rementuijian"></use>
      </svg> -->
      <h2>近期热门 - 点击最多</h2>
    </div>
    <div class="hot-article-list ">
      <ul>
        <li v-for="row in articleList.slice(0, 10)" :key="row.id">
          <router-link :to="{ name: 'detail', params: { href: row.href } }">{{
            row.title
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: mapState({
    articleList: state => state.article.articleList
  }),
  created() {
    //this.getHotArticleList();
  },
  mounted() {},
  methods: {
    // getHotArticleList() {
    //   this.post("/article/hotList").then(res => {
    //     //    console.log("热门文章", res);
    //     if (res.code == 200) {
    //       this.hotArticleList = res.data;
    //     }
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.hot-article {
  margin-top: 16px;
}
.hot-article-list {
  background: #fff;

  ul {
    margin-bottom: 0;
  }

  li {
    font-size: 0.8rem;
    padding: 8px 16px;
    a {
      display: block;
      color: #333;
      line-height: 20px;
      height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:hover {
      background: rgba(245, 245, 245, 0.6);
    }
  }
}
</style>
