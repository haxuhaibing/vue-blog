<template lang="html">
  <div class="container v-model about-me">
     <a-avatar :size="44" src="/images/avatar.jpg" />
     <p></p>
     <p>尽快完善吧</p>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.about-me{
  padding: 16px;
  margin-top: 16px;
}
</style>
