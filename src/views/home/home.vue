<template lang="html">
  <div class="index-content">
    <div class="container">
      <a-upload
        name="avatar"
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        action="http://api.xuhaibing.io/v1/upload/image.php"
        :beforeUpload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-row :gutter="16">
        <a-col :lg="{ span: 18 }">
          <div class="article-list v-model v-shadow">
            <div
              class="article-list-item"
              v-for="row in articleList"
              :key="row.id"
            >
              <h2 class="title">
                <router-link :to="{ name: 'detail', params: { id: row.id } }">{{
                  row.title
                }}</router-link>
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
</template>

<script>
import HotArticle from "@/components/HotArticle.vue";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "home",
  data() {
    return {
      loading: false,
      imageUrl: "",
      articleList: []
    };
  },
  created() {
    //  this.getArticleList();
  },
  mounted() {},
  methods: {
    getArticleList() {
      this.post("/article/list").then(res => {
        console.log("文章列表", res);
        if (res.code == 200) {
          this.articleList = res.data;
        }
      });
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        let file=info.file;
        console.log(file);
        if(file.response.code ==200){
          this.imageUrl = file.response.data.url.replace('../../','http://api.xuhaibing.io/');
          this.loading = false;
        }

      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  components: {
    HotArticle
  }
};
</script>

<style lang="scss" scoped>
.article-list {
  margin-top: 16px;
  padding-top: 0;
}

.article-list-item {
  padding: 16px 0;
  border-bottom: 1px solid #f4f4f4;
  .title {
    font-size: 24px;
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
