<template>
  <div class="help-page-container">
    <mobile></mobile>
  </div>
</template>
<script>
import mobile from './help/mobile.vue';
import bridge from './bridge';

export default {
  components: {
    mobile
  },
  mounted() {
    bridge["app.setWebTitle"]({title: "Help"});
  }
}
</script>

<style lang="scss" scoped>
.help-page-container {
  box-sizing: border-box;
  padding: 0px 24px 20px 24px;
}
</style>

