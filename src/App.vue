<template>
  <div id="app">
    <Header v-show="!$route.meta.isHideHeader"></Header>
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Header
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
