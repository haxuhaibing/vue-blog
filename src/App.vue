<template>
  <div id="app">
    <Login></Login>
    <Header v-show="!$route.meta.isHideHeader"></Header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Login from "@/components/Login.vue";

function getDetailDay(day) {
  function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  }
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds);
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "/" + tMonth + "/" + tDate;
}

export default {
  data() {
    return {};
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {},
  components: {
    Header,
    Footer,
    Login
  }
};
</script>
<style lang="scss">
li,
ol,
ul {
  list-style: none;
  padding: 0;
}
a {
  &:hover {
    color: #007bff !important;
    text-decoration: none !important;
  }
}
#app {
}
</style>
