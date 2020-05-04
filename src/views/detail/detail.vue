<template lang="html">
  <div class="container detail-container">
    <a-row :gutter="16">
      <a-col :lg="{ span: 18 }">
        <div class="detail-content v-model v-shadow">
          <a-spin tip="加载中..." :spinning="spinning">
            <div class="detail-title">
              <h1>{{ articleDetail.title }}</h1>
            </div>
            <div class="detail-propety">
              <a-row :gutter="16" type="flex" justify="start" align="middle">
                <a-col>
                  <div class="detail-tags">
                    <a-tag color="blue">{{ articleDetail.tags }}</a-tag>
                  </div>
                </a-col>
                <a-col>
                  <div class="detail-propety-publish">
                    <span>发布于</span>
                    <span>{{ articleDetail.time }}</span>
                  </div></a-col
                >
              </a-row>
            </div>
            <div
              class="detail-desc"
              v-html="articleDetail.contents"
              v-highlight
            ></div>
          </a-spin>
        </div>
        <div class="post-comment v-model v-shadow">
          <h2>发布评论</h2>
          <div class="post-comment-form">
            <div class="form-group" v-if="!username">
              <a-input v-model="nickname" placeholder="昵称" />
            </div>
            <div class="form-group">
              <Editor
                @ckeditorContents="ckeditorContents"
                :parentContents="contents"
              ></Editor>
            </div>
            <div class="form-group">
              <a-button type="primary" @click="onComment">发布评论</a-button>
            </div>
          </div>
        </div>
        <a-spin tip="加载中..." :spinning="commentsSpinning">
          <Comments :commentsList="articleCommits"></Comments>
        </a-spin>
      </a-col>
      <a-col :lg="{ span: 6 }">
        <HotArticle></HotArticle>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import HotArticle from "@/components/HotArticle.vue";
import Comments from "@/components/Comments.vue";
import Editor from "@/components/Editor.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      spinning: true,
      commentsSpinning: true,
      commentsList: [],
      nickname: "",
      contents: "",
      username: this.$store.state.user.userInfo.username || "",
      href: this.$route.params.href
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  computed: mapState({
    articleDetail: state => state.article.articleDetail,
    articleCommits: state => state.article.articleCommits
  }),
  methods: {
    init() {
      this.getDetail();
    },
    getDetail() {
      let data = {
        href: this.$route.params.href
      };

      if (this.$route.params.href != this.articleDetail.href) {
        //清空评论列表
        // this.articleCommits=[];
        this.$store.dispatch("article/articleDetail", { data }).then(res => {
          this.spinning = false;
          document.title = this.articleDetail.title;
        });
      } else {
        this.spinning = false;
        this.commentsSpinning = false;
        document.title = this.articleDetail.title;
      }
      this.getComments();
    },
    //发布评论
    onComment() {
      let message = this.$message.loading("发布中...", 0);
      let data = {
        username: this.username,
        nickname: this.nickname,
        contents: this.contents,
        href: this.$route.params.href
      };
      this.$store.dispatch("article/postCommit", { data }).then(res => {
        //发布评论后，重新获取评论列表
        let data = {
          href: this.$route.params.href
        };
        this.$store.dispatch("article/articleCommits", { data }).then(res => {
          //发布成功后，清除输入框内容
          this.contents = "";
          setTimeout(message, 10);
          this.$message.success("发布成功！", 1);
        });
      });
    },
    //获取评论列表
    getComments() {
      let data = {
        href: this.$route.params.href
      };
      this.$store.dispatch("article/articleCommits", { data }).then(res => {
        this.commentsSpinning = false;
      });
    },
    //子组件传递给父组件
    ckeditorContents(val) {
      this.contents = val;
    }
  },
  components: {
    HotArticle,
    Comments,
    Editor
  },
  watch: {
    $route(to, from) {
      //注意监听的是query还是params
      if (to.params.href != from.params.href) {
        this.href = this.$route.params.href;
        this.init();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 16px;
}
.detail-content {
  margin-top: 16px;
}
.post-comment {
  margin-top: 16px;
}
.post-comment-form {
  textarea {
    width: 100%;
    height: 160px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    padding: 8px;
  }
  .form-group {
    margin-top: 16px;
  }
}

.detail-propety-publish {
  color: #6c757d;
  font-size: 12px;

  span {
    margin-right: 8px;
  }
}

.detail-tags {
  .ant-tag {
    margin-right: 0;
  }
}
.detail-desc {
  margin-top: 16px;
}
</style>
