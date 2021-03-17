<template>
  <v-row class="red overflow-y-auto scroll" style="height: 80vh">
    <v-col cols="12" class="text-center">
      <v-responsive height="40vh" class="blue"></v-responsive>
      <div v-for="item in 30" :key="item">{{ item }}</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style lang="scss">
// 隐藏滚动条
.scroll {
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE10+
  &::-webkit-scrollbar {
    display: none; // Chrome,Safari
  }
}
</style>
