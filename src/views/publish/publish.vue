<template lang="html">
  <div class="container ">
    <div class="v-model v-shadow publish-container">
      <a-spin tip="Loading..." :spinning="spinning">
        <a-row>
          <a-col :lg="{ span: 24 }">
            <a-form @submit="onSubmit">
              <a-form-item>
                <a-input v-model="title" placeholder="请输入标题" />
              </a-form-item>
              <a-form-item>
                <a-select
                  v-model="tag"
                  style="width: 120px"
                  @change="handleChange"
                >
                  <a-select-option
                    v-for="item in tags"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <Editor
                  @ckeditorContents="ckeditorContents"
                  :parentContents="contents"
                ></Editor>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="onSubmit"
                  >发布文章</a-button
                ></a-form-item
              >
            </a-form></a-col
          >
        </a-row>
      </a-spin>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Editor from "@/components/Editor.vue";
export default {
  name: "publish",
  data() {
    return {
      detail: "",
      title: "",
      tag: "0",
      tags: [],
      contents: "",
      spinning: false
    };
  },
  mounted() {
    this.getCate();
  },
  computed: { ...mapState("article", ["articleClassify", "articleDetail"]) },
  methods: {
    ...mapActions("article", [
      "CREAT_ARTICLE",
      "ARTICLE_CATEGORY",
      "ARTICLE_DETAIL"
    ]),
    getCate() {
      this.ARTICLE_CATEGORY().then(() => {
        this.tags = [
          {
            id: "0",
            name: "请选择分类",
            tag: "请选择分类"
          },
          ...this.articleClassify
        ];

        //编辑
        if (this.$route.query.href) {
          this.getArticle();
        }
      });
    },
    //编辑=>获取详情
    getArticle() {
      let href = {
        href: this.$route.query.href
      };
      this.ARTICLE_DETAIL({ href }).then(res => {
        this.contents = this.articleDetail.contents;
        this.title = this.articleDetail.title;
        document.title = "更新文章";
        for (let item of this.tags) {
          if (item.name == this.articleDetail.tags) {
            this.tag = item.id;
          }
        }
      });
    },
    //更新&&发布
    onSubmit() {
      let data = {
        title: this.title,
        contents: this.contents,
        cate_id: this.tag,
        user_id: this.$store.state.user.userInfo.id,
        edit_id: this.detail.id,
        href: this.$route.query.href || ""
      };

      this.CREAT_ARTICLE({ data }).then(res => {
        this.$message.success("发布成功");
        this.title = "";
        this.tag = "0";
        this.contents = "";
      });
    },
    handleChange(value) {
      this.tag = value;
    },
    ckeditorContents(val) {
      this.contents = val;
    }
  },
  components: {
    Editor
  }
};
</script>

<style lang="scss" scoped>
.publish-container {
  margin-top: 16px;
}
.container {
  padding: 0 16px;
}
.publish-container {
  margin-top: 15px;
  .ant-form-item {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
