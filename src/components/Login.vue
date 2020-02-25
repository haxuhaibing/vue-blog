<template lang="html">
  <el-dialog
    title="登录"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    class="login-form"
  >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
          placeholder="请输入手机号或邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    return {
      dialogVisible: this.$store.state.isLogin,
      ruleForm: {
        username: "xuhaibing",
        password: "123456"
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.dialogVisible = false;
      this.post("user/login", {
        username: this.ruleForm.username,
        password: this.ruleForm.password
      }).then(res => {
        console.log("登录", res);
        if (res.code == 200) {
          this.$store.commit("SET_USER", JSON.stringify(res.data));
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$store.commit("LOGIN_STATUS", false);
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  watch: {
    isLogin(val) {
      this.dialogVisible = val;
      console.log("变化了");
    }
  }
};
</script>

<style lang="scss">
.login-form {
  .el-dialog__body {
    padding: 16px;
    padding-bottom: 6px;
  }
}
</style>
