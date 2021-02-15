<template>
  <v-snackbar
    transition="scroll-y-transition"
    top
    v-model="isShow"
    :timeout="timeout"
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
    timeout: 3000,
    color: "primary",
  }),
  watch: {
    value(newValue) {
      newValue !== "" && (this.isShow = true);
    },
    // 还原样式
    isShow(newValue, oldValue) {
      if (!newValue && oldValue) {
        this.value = "";
        this.timeout = 3000;
        this.color = "primary";
      }
    },
  },
};
</script>
