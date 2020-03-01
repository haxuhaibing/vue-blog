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
        <div class="post-comment v-model v-shadow mt15">
          <h2>发布评论</h2>
          <div class="post-comment-form">
            <div class="form-group" v-if="!username">
              <a-input v-model="nickname" placeholder="昵称" />
            </div>
            <div class="form-group">
              <ckeditor
                :editor="editor"
                v-model="contents"
                :config="editorConfig"
              >
              </ckeditor>
            </div>
            <div class="form-group">
              <a-button type="primary" @click="onComment">发布评论</a-button>
            </div>
          </div>
        </div>
        <div class="article-comments-content v-model v-shadow mt15">
          <h2>评论列表</h2>
          <div class="article-comments-list">
            <div
              class="article-comments-item"
              v-for="row in commentsList"
              :key="row.id"
            >
              <div class="item-avatar">
                <img :src="row.avatar" alt="" />
              </div>
              <div class="item-content">
                <div class="username">
                  <span class="user">{{ row.username }}</span>
                  <span class="time">{{ row.time }}</span>
                </div>
                <div class="comment" v-html="row.contents" v-highlight></div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :lg="{ span: 6 }">
        <HotArticle></HotArticle>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import ClassicEditor from "@/assets/ckeditor5/build/ckeditor.js";
import HotArticle from "@/components/HotArticle.vue";
export default {
  name: "detail",
  data() {
    return {
      detail: {},
      commentsList: {},
      nickname: "",
      username: this.$store.state.userInfo.username || "",
      id: this.$route.params.id,
      editor: ClassicEditor,
      contents: "",
      editorConfig: {
        toolbar: {
          items: [
            // "heading",
            // "|",
            "bold",
            "italic",
            // "link",
            // "bulletedList",
            // "numberedList",
            // "|",
            // "imageUpload",
            // "blockQuote",
            // "insertTable",
            // "code",
            "codeBlock"
            // "|",
            // "undo",
            // "redo"
          ]
        },
        language: "zh-cn"
      }
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.getDetail();
      this.getComments();
    },
    getDetail() {
      this.post("article/detail", {
        id: this.id
      }).then(res => {
        console.log("获取详情", res);
        this.detail = res.data;
        document.title = res.data.title;
      });
    },
    onComment() {
      this.post("article/comment", {
        username: this.username,
        nickname: this.nickname,
        contents: this.contents,
        pid: this.id
      }).then(res => {
        console.log("提交评论", res);
        if (res.code == 200) {
          this.$message.success("评论成功");
          this.contents = "";
          this.getComments();
        }
      });
    },
    getComments() {
      this.post("article/getComments", {
        pid: this.id
      }).then(res => {
        console.log("获取评论", res);
        this.commentsList = res.data;
      });
    }
  },
  components: {
    HotArticle
  },
  watch: {
    $route(to, from) {
      //注意监听的是query还是params
      if (to.params.id != from.params.id) {
        this.id = this.$route.params.id;
        this.init();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-content {
  margin-top: 16px;
}
.article-comments-list {
  margin-top: 15px;
}
.article-comments-item {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  margin-bottom: 15px;
}

.article-comments-item .item-avatar {
  margin-right: 20px;
}

.article-comments-item .item-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: block;
}

.article-comments-item .item-content {
  flex: 1;
}

.article-comments-item .username {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
}

.article-comments-item .username .user {
  font-weight: 600;
}

.article-comments-item .username .time {
  color: #999;
  margin-left: 10px;
}

.article-comments-item .comment {
  color: #333;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}
.article-comments-item .comment img {
  max-width: 200px;
  display: block;
  height: auto !important;
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
