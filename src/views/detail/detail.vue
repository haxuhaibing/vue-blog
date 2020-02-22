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
            <div class="form-group" v-if="username">
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
                确定
              </button>
            </div>
          </div>
        </div>
        <div class="article-comments-content">
          <div class="index-headline">
            <h4>评论列表</h4>
          </div>
          <div class="article-comments-list">
            <div class="article-comments-item" v-for="row in commentsList">
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
        <div class="hot">
          <div class="headline-title">
            <h6>近期热门 - 点击最多</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: {
    content: {
      type: String,
      default: "请输入您的内容"
    }
  },
  data() {
    return {
      detail: {},
      commentsList: {},
      nickname: "",
      username: this.$store.state.userInfo.username || "",
      contents: ""
    };
  },
  mounted() {
    this.initEditor();
    this.post("detail/detail.php", {
      id: 1
    }).then(res => {
      console.log(res);
      this.detail = res.data;
    });
    this.getComments();
  },
  methods: {
    initEditor() {
      var config = {
        extraPlugins: "codesnippet",
        codeSnippet_theme: "github",
        height: 200
      };
      CKEDITOR.replace("editor", config);
      //  CKEditor 初始化完成加载数据
      CKEDITOR.on("instanceReady", e => {
        this.setContent();
      });

      //  CKEditor 数据改变-监听
      CKEDITOR.instances.editor.on("change", e => {



      });
    },
    onComment() {
      this.post("detail/comment.php", {
        username: this.username,
        nickname: this.nickname,
        contents: this.contents,
        pid: 1
      }).then(res => {
        console.log("评理", res);
      });
    },
    getComments() {
      this.post("detail/getComments.php", {
        pid: 1
      }).then(res => {
        console.log("获取评理", res);
        this.commentsList = res.data;
      });
 
    },
    setContent() {
      CKEDITOR.instances.editor.setData(this.content);
    },
    getContent() {
      // 参照vue子组件传值给
      this.$emit("catchData", CKEDITOR.instances.editor.getData());
    }
  }
};
</script>

<style lang="css" scoped>
.detail-container{
  margin-top: 15px;
}
.article-comments-list{
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
.article-comments-item .comment img{
  max-width: 200px;
  display: block;
  height: auto!important;
}
</style>
