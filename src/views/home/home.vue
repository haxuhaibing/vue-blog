<template lang="html">
  <div>
    <div class="index-content">
      <div class="container">
        <a-row :gutter="16">
          <a-col :lg="{ span: 18 }">
            <div class="article-list v-model v-shadow">
              <div v-if="disposeList.length == 0" style="padding-top:20px;">
                <a-empty>
                  <span slot="description">
                    暂无数据
                  </span>
                </a-empty>
              </div>
              <div
                class="article-list-item"
                v-for="row in disposeList"
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

            <div class="mt15">
              <a-pagination
                v-model="current"
                :defaultPageSize="setps"
                :total="total"
                @change="onChangePagination"
                showLessItems
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
      currentPaginationList: [],
      disposeList: []
    };
  },
  computed: mapState({
    articleList: state => state.article.articleList
  }),
  watch: {
    articleList() {
      this.initCurrentList();
    }
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      //  if (this.articleList.length <= 0) {
      this.$store.dispatch("article/setArticle").then(res => {
        this.disposeList = res.map(item => ({
          ...item,
          contents: this.cutCharacterString(item.contents)
        }));
      });
      //}
      this.initCurrentList();
    },
    onChangePagination(page, pageSize) {
      let result = this.articleList.slice(
        (page - 1) * pageSize,
        pageSize * page
      );
      this.currentPaginationList = result;
    },
    //获取分页数据
    initCurrentList() {
      let result = this.articleList.slice(0, this.setps);
      this.total = this.articleList.length;
      this.currentPaginationList = result;
    },
    //截取文章长度
    cutCharacterString(art) {
      var br = {};
      br.spTags = ["img", "br", "hr"]; /*不需要成对出现的标记*/
      br.contain = function(arr, it) {
        for (var i = 0, len = arr.length; i < len; i++) {
          if (arr[i] == it) {
            return true;
          }
        }
        return false;
      };
      br.subArtc = function(article, worldNum) {
        var result = [];
        /*首先截取需要的字串*/

        var wcount = 0;
        var startTags = [],
          endTags = [];
        var isInTag = false;
        for (var i = 0, len = article.length; i < len; i++) {
          var w = article[i];
          result.push(w);
          if (w == "<") {
            isInTag = true;
          }
          if (!isInTag) {
            wcount++;
            if (wcount == worldNum) {
              break;
            }
          }
          if (w == ">") {
            isInTag = false;
          }
        }
        /*对字串进行处理*/

        var j = 0;
        isInTag = false;
        var isStartTag = true;
        var tagTemp = "";
        while (j < i) {
          w = result[j];
          if (isInTag) {
            if (w == ">" || w == " " || w == "/") {
              isInTag = false;
              if (isStartTag) {
                startTags.push(tagTemp);
              } else {
                endTags.push(tagTemp);
              }
              tagTemp = "";
            }
            if (isInTag) {
              tagTemp += w;
            }
          }
          if (w == "<") {
            isInTag = true;
            if (result[j + 1] == "/") {
              isStartTag = false;
              j++;
            } else {
              isStartTag = true;
            }
          }
          j++;
        }
        /*剔除img,br等不需要成对出现的标记*/

        var newStartTags = [];
        for (var x = 0, len = startTags.length; x < len; x++) {
          if (!br.contain(br.spTags, startTags[x])) {
            newStartTags.push(startTags[x]);
          }
        }
        /*添加没有的结束标记*/

        var unEndTagsCount = newStartTags.length - endTags.length;
        while (unEndTagsCount > 0) {
          result.push("<");
          result.push("/");
          result.push(newStartTags[unEndTagsCount - 1]);
          result.push(">");
          unEndTagsCount--;
        }
        return result.join("");
      };

      return br.subArtc(art, 200);
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
    font-size: 14px;
    color: #3d3d3d;
  }
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
}
</style>
