<template>
  <v-snackbar
    transition="scroll-y-transition"
    top
    timeout="3000"
    v-model="isShow"
    :color="color"
  >
    {{ value }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="isShow = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    isShow: false,
    value: "",
    color: "primary",
  }),
  /* 当父组件传入的props值与上次相同时不会触发watch，无法修改isShow的值，再次显示
   * 所以不用props传值，父组件通过$refs直接访问组件数据
   */
  watch: {
    value(newValue) {
      newValue !== "" && (this.isShow = true);
    },
    // 还原样式
    isShow(newValue) {
      if (!newValue) {
        this.value = "";
        this.color = "primary";
      }
    },
  },
};
</script>
