<template>
  <v-snackbar
    v-model="isShow"
    transition="scroll-y-transition"
    top
    :color="color"
    :timeout="timeout"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="isShow = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    isShow: false,
  }),
  watch: {
    text(newValue) {
      newValue !== "" ? (this.isShow = true) : (this.isShow = false);
    },
    // 关闭时清空内容，否则当两次 text 内容相同时不会触发上面的 watch 监听事件
    isShow(newValue) {
      if (!newValue) {
        this.topText("");
      }
    },
  },
  computed: {
    ...mapState({
      text: (state) => state.topSnackBar.text,
      color: (state) => state.topSnackBar.color,
      timeout: (state) => state.topSnackBar.timeout,
    }),
  },
  methods: {
    ...mapMutations(["topText"]),
  },
};
</script>
