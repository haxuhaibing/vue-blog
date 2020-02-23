<template lang="html">
  <div class="container detail-container">
    <div class="row">
      <div class="col-lg-9">
        <div class="detail-content">
          <div class="detail-title">
            <h1>{{ detail.title }}</h1>
          </div>
          <div class="detail-desc" v-html="detail.contents" v-highlight></div>
        </div>
        <div class="post-comment">
          <div class="index-headline">
            <h4>评论列表</h4>
          </div>
          <div class="post-comment-form">
            <div class="form-group" v-if="!username">
              <input
                type="text"
                placeholder="昵称"
                class="form-control"
                v-model="nickname"
              />
            </div>
            <div class="form-group">
              <textarea v-model="contents" id="editor"></textarea>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit" @click="onComment">
                发布评论
              </button>
            </div>
          </div>
        </div>
        <div class="article-comments-content">
          <div class="index-headline">
            <h4>评论列表</h4>
          </div>
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
                <div class="comment">{{ row.contents }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <HotArticle></HotArticle>
      </div>
    </div>
  </div>
</template>

<script>
import HotArticle from "@/components/HotArticle.vue";
export default {
  name: "detail",
  data() {
    return {
      detail: {},
      commentsList: {},
      nickname: "",
      username: this.$store.state.userInfo.username || "",
      contents: "",
      id: this.$route.params.id
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
      this.post("detail/detail.php", {
        id: this.id
      }).then(res => {
        //  console.log("获取详情", res);
        this.detail = res.data;
      });
    },
    onComment() {
      this.post("detail/comment.php", {
        username: this.username,
        nickname: this.nickname,
        contents: this.contents,
        pid: this.id
      }).then(res => {
        console.log("提交评论", res);
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "评论成功",
            type: "success"
          });
          this.contents = "";
          this.getComments();
        }
      });
    },
    getComments() {
      this.post("detail/getComments.php", {
        pid: this.id
      }).then(res => {
        //console.log("获取评论", res);
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
.detail-container {
  margin-top: 15px;
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
  margin-top: 0.5rem;
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
}
</style>
