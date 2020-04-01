<template lang="html">
  <div class="container detail-container">
    <a-row :gutter="16">
      <a-col :lg="{ span: 18 }">
        <div class="detail-content v-model v-shadow">
          <div class="detail-title">
            <h1>{{ detail.title }}</h1>
          </div>
          <div class="detail-propety">
            <a-row :gutter="16" type="flex" justify="start" align="middle">
              <a-col>
                <div class="detail-tags">
                  <a-tag color="blue">{{ detail.tags }}</a-tag>
                </div>
              </a-col>
              <a-col>
                <div class="detail-propety-publish">
                  <span>发布于</span>
                  <span>{{ detail.time }}</span>
                </div></a-col
              >
            </a-row>
          </div>
          <div class="detail-desc" v-html="detail.contents" v-highlight></div>
        </div>
        <div class="post-comment v-model v-shadow">
          <h2>发布评论</h2>
          <div class="post-comment-form">
            <div class="form-group" v-if="!username">
              <a-input v-model="nickname" placeholder="昵称" />
            </div>
            <div class="form-group">
              <Editor @ckeditorContents="ckeditorContents" :parentContents="contents"></Editor>
            </div>
            <div class="form-group">
              <a-button type="primary" @click="onComment">发布评论</a-button>
            </div>
          </div>
        </div>
        <Comments :commentsList="commentsList"></Comments>
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

export default {
  name: "detail",
  data() {
    return {
      detail: {},
      commentsList: {},
      nickname: "",
      contents: "",
      username: this.$store.state.userInfo.username || "",
      href: this.$route.params.href
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.getDetail();
    },
    getDetail() {
      this.post("article/detail", {
        href: this.href
      }).then(res => {
        console.log("获取详情", res);
        this.detail = res.data;
        document.title = res.data.title;
        this.getComments();
      });
    },
    //发布评论
    onComment() {
      this.post("article/comment", {
        username: this.username,
        nickname: this.nickname,
        contents: this.contents,
        cate_id: this.detail.id
      }).then(res => {
        console.log("提交评论", res);
        if (res.code == 200) {
          this.$message.success("评论成功");
          this.contents = "";
          this.getComments();
        } else {
          this.$message.success("评论失败");
        }
      });
    },
    //获取评论列表
    getComments() {
      this.post("article/getComments", {
        cate_id: this.detail.id
      }).then(res => {
        console.log("获取评论", res);
        this.commentsList = res.data;
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
