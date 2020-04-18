<template lang="html">
  <div>
    <!-- swiper -->
    <!-- <div class="swiper-container index-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div> -->

    <!-- /swiper -->
    <div class="v-flex">
      <div class="item">
        <div class="name">
          <svg class="icon-webpack2" aria-hidden="true">
            <use xlink:href="#icon-webpack"></use></svg
          >姓名：
        </div>
        <div class="value">
          Chinese DJ 2019慢摇串烧《Sent It - 一百万个可能 - Move Your Body -
          下墜 - 不怕不怕》Remix【動態歌詞Lyrics】DJ MoonBaby
        </div>
        <div class="more">qfds</div>
      </div>
    </div>
    <div class="index-content">
      <div class="container">
        <a-row :gutter="16">
          <a-col :lg="{ span: 18 }">
            <div class="article-list v-model v-shadow">
              <div
                class="article-list-item"
                v-for="row in articleList"
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
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import SwiperCss from "swiper/css/swiper.css";
import HotArticle from "@/components/HotArticle.vue";
export default {
  name: "home",
  data() {
    return {
      articleList: []
    };
  },
  created() {},
  mounted() {
    var indexSwiper = new Swiper(".index-swiper", {
      loop: true,
      pagination: {
        el: ".index-swiper .swiper-pagination"
      },
      navigation: {
        nextEl: ".index-swiper .swiper-button-next",
        prevEl: ".index-swiper .swiper-button-prev"
      }
    });
    this.getArticleList();
  },
  watch: {
    changePrice() {}
  },
  methods: {
    getArticleList() {
      this.post("/article/list").then(res => {
        console.log("文章列表", res);
        if (res.code == 200) {
          this.articleList = res.data || [];
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
.icon-webpack2 {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  font-size: 50px;
}

.v-flex {
  .item {
    display: flex;
    padding: 0 30px;

    .name {
      font-size: 0.8rem;
    }
    .value {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
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
