<template lang="html">
  <div class="article-comments-content v-model v-shadow" v-if="isShowCommits">
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
</template>

<script>
export default {
  name: "comments",
  props: {
    commentsList: {
      Type: Array,
      Required: true
    }
  },
  data() {
    return {
      isShowCommits: true
    }
  },
  watch:{
    commentsList(){
      if(this.commentsList.length==0){
        this.isShowCommits=false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.article-comments-content {
  margin-top: 16px;
}
.article-comments-list {
  margin-top: 16px;
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
</style>
