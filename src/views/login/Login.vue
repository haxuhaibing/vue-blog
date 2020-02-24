<template>
  <div id="login">
    <div style="margin-top:15px;">
      <div class="container">
        <div class="form-group">
          <label for="exampleInputEmail1">用户名</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">密码</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" class="btn btn-primary" @click="submit">
          确定
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "xuhaibing",
      password: "123456"
    };
  },
  mounted() {},
  methods: {
    submit() {
      this.post("user/login/login", {
        username: this.username,
        password: this.password
      }).then(res => {
        console.log("登录", res);
        if (res.code == 200) {
          this.$store.commit("SET_USER", JSON.stringify(res.data));
          this.$router.push({
            path: "/"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss"></style>
