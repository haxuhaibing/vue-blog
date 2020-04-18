<template>
  <div>
    <a-modal
      title="登录"
      :visible="isLogin"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      class="login-modal"
      :footer="null"
    >
      <a-form :form="form" class="login-form">
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入用户名' }] }
            ]"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码' }]
              }
            ]"
            placeholder="请输入密码"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" @click="check" block size="large">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      confirmLoading: true,
      form: this.$form.createForm(this, { name: "dynamic_rule" })
    };
  },
  mounted() {},
  methods: {
    check() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let username = values.username;
          let password = values.password;
          this.post("user/login", {
            username: username,
            password: password
          }).then(res => {
            console.log("登录", res);
            if (res.code == 200) {
              this.$store.commit("user/loginDialog", false);
              this.$store.commit("user/setUser", JSON.stringify(res.data));
            }
          });
        }
      });
    },
    handleCancel() {
      this.$store.commit("user/loginDialog", false);
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    }
  }
};
</script>
<style lang="scss">
.login-modal {
  max-width: 360px;
}
.login-form {
  .ant-form-item {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
