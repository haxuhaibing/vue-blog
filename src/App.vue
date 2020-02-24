<template>
  <div id="app">
    <Header v-show="!$route.meta.isHideHeader"></Header>
    <router-view />
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Header,
    Footer
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
