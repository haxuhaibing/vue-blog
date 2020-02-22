<template>
<div id="login">

  <a-form-item label="用户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-input v-model="username" />
  </a-form-item>
  <a-form-item label="密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-input v-model="password" />
  </a-form-item>
  <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
    <a-button type="primary" html-type="submit" @click="submit">
      确定
    </a-button>
  </a-form-item>

</div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      username: 'xuhaibing',
      password: '123456',
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {
        name: 'coordinated'
      }),
    }
  },
  mounted() {},
  methods: {
    submit() {
      this.post('login/login.php', {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log('登录',res)
          if (res.code == 0) {
            sessionStorage.setItem('userInfo', JSON.stringify(res.data));
            this.$router.push({
              path:'/'
            })
          }
        })
    }
  }
}
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
