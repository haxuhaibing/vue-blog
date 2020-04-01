<template lang="html">
  <ckeditor
    :editor="editor"
    v-model="contents"
    :config="editorConfig"
  ></ckeditor>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
export default {
  name: "editor",
  props: {
    parentContents: {
      Type: String,
      Required: true
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      contents: "",
      editorConfig: {}
    };
  },
  created() {
    this.editorConfigInit();
  },
  mounted() {},
  methods: {
    editorConfigInit() {
      let path = this.$route.path;
      if (path.includes("detail")) {
        this.editorConfig = {
          plugins: [
            EssentialsPlugin,
            BoldPlugin,
            ItalicPlugin,
            LinkPlugin,
            ParagraphPlugin,
            CodeBlock
          ],
          toolbar: {
            items: ["codeBlock"]
          }
        };
      } else {
        this.editorConfig = {
          plugins: [
            EssentialsPlugin,
            BoldPlugin,
            ItalicPlugin,
            LinkPlugin,
            ParagraphPlugin,
            CodeBlock,
            SimpleUploadAdapter,
            EasyImage
          ],
          toolbar: {
            items: [
              "bold",
              "italic",
              "link",
              "imageUpload",
              "undo",
              "redo",
              "codeBlock"
            ]
          },
          simpleUpload: {
            uploadUrl: "http://api.xuhaibing.com/v1/upload/ckimage.php"
          }
        };
      }
    }
  },
  watch: {
    //传递值给父组件
    contents() {
      this.$emit("ckeditorContents", this.contents);
    },
    //接收父组件内容
    parentContents() {
      this.contents = this.parentContents;
    }
  }
};
</script>

<style lang="scss" scoped>
.publish-container {
  .ck-content {
    min-height: 300px;
  }
}

div {
  .ck.ck-toolbar {
    border: 1px solid #d9d9d9;
  }

  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    border: 1px solid #d9d9d9;
  }

  .ck-toolbar__items,
  .ck-toolbar_grouping {
    background: #fff !important;
  }
}
</style>
