<template lang="html">
  <div class="container publish-container">
    <el-form :model="formLabelAlign">
      <el-form-item>
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="tag" placeholder="请选择分类">
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <ckeditor :editor="editor" v-model="contents" :config="editorConfig">
        </ckeditor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "publish",
  data() {
    return {
      title: "",
      tag: "",
      tags: [],
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      editor: ClassicEditor,
      contents: "",
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "code",
            "codeBlock"
          ]
        },
        language: "zh-cn"
      }
    };
  },
  mounted() {
    this.post("cate/cateType").then(res => {
      if (res.code == 200) {
        this.tags = res.data;
      }
    });
  },
  methods: {
    onSubmit() {
      this.post("article/publishArticle", {
        title: this.title,
        contents: this.contents,
        cate_id: this.tag,
        user_id: this.$store.state.userInfo.id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
.publish-container{
  margin-top: 15px;
}
</style>
