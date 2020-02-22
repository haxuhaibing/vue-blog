<template lang="html">
  <div class="">

    <div class="index-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <div class="article-list">
              <div class="article-list-item" v-for="row in articleList">
                <h2 class="title" @click="handleDetails(row.id)">
                  {{ row.title }}
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
          <div class="col-lo-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      articleList: []
    };
  },
  mounted() {
    this.post("/article/list.php").then(res => {
      this.articleList = res.data;
    });
  },
  methods: {
    handleDetails(id) {
      this.$router.push({
        path: `/detail/${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.article-list-item {
  padding: 15px 0;
  border-bottom: 1px solid #f4f4f4;
  .title {
    font-size: 24px;
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
