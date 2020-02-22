<template>
  <div id="app">
    <Header></Header>
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
}
#app {
}
</style>
