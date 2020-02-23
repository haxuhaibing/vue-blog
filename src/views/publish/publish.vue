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
        <el-input
          type="textarea"
          v-model="contents"
          :rows="8"
          placeholder="请输入内容"
        ></el-input>
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
      title: "1231",
      tag: "",
      tags: [],
      contents: "",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  },
  mounted() {
    this.post("cate/cateType.php").then(res => {
      if (res.code == 0) {
        this.tags = res.data;
      }
    });
  },
  methods: {
    onSubmit() {
      this.post("article/publishArticle.php", {
        title: this.title,
        contents: this.contents,
        cate_id: this.tag,
        username: this.$store.state.userInfo.username
      }).then(res => {
        console.log(res);
        if (res.code == 0) {
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
