<template>
  <v-snackbar
    transition="scroll-y-transition"
    top
    :timeout="timeout"
    v-model="isShow"
    :color="color"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="isShow = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    isShow: false,
    text: "",
    color: "error",
    timeout: 3000,
  }),
  watch: {
    // 关闭时还原样式
    isShow(newValue) {
      if (!newValue) {
        setTimeout(() => {
          this.text = "";
          this.color = "error";
          this.timeout = 3000;
        }, 100);
      }
    },
    text(newValue) {
      if (newValue !== "") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>
