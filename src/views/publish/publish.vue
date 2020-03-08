<template lang="html">
  <div class="container ">
    <div class="v-model v-shadow publish-container">
      <a-row>
        <a-col :lg="{ span: 24 }">
          <a-form @submit="onSubmit">
            <a-form-item>
              <a-input v-model="title" placeholder="请输入标题" />
            </a-form-item>

            <a-form-item>
              <a-select
                :defaultValue="defaultValue"
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
              <Editor @ckeditorContents="ckeditorContents"></Editor>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="onSubmit"
                >发布文章</a-button
              ></a-form-item
            >
          </a-form></a-col
        >
      </a-row>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue";
export default {
  name: "publish",
  data() {
    return {
      defaultValue: "请选择分类",
      detail: "",
      title: "",
      tag: "",
      tags: [],
      contents: ""
    };
  },
  mounted() {
    this.post("cate/cateType").then(res => {
      if (res.code == 200) {
        this.tags = res.data;
        if (this.$route.query.edit) {
          this.getArticle();
        }
      }
    });
  },
  methods: {
    getArticle() {
      this.post("article/detail", {
        id: this.$route.query.edit
      }).then(res => {
        console.log("获取详情", res);
        this.detail = res.data;
        this.contents = res.data.contents;
        this.title = res.data.title;
        for (let item of this.tags) {
          if (item.name == res.data.tags) {
            this.tag = item.id;
            this.defaultValue = item.name;
          }
        }
      });
    },
    onSubmit() {
      this.post("article/publishArticle", {
        title: this.title,
        contents: this.contents,
        cate_id: this.tag,
        user_id: this.$store.state.userInfo.id,
        edit_id: this.$route.query.edit
      }).then(res => {
        console.log("submit", res);
        if (res.code == 200) {
        }
      });
    },
    handleChange(value) {
      this.tag = value;
      console.log(value);
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
