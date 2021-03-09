<template>
  <v-snackbar
    v-model="isShow"
    transition="slide-x-reverse-transition"
    right
    bottom
    class="mb-8 mr-8"
    shaped
    elevation="12"
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
    // 关闭时清空内容，否则当两次 text 内容相同时不会触发上面的 watch 监听事件显示提示
    isShow(newValue) {
      if (!newValue) {
        setTimeout(() => {
          this.tip("");
        }, 100);
      }
    },
  },
  computed: {
    ...mapState({
      text: (state) => state.tip.text,
      color: (state) => state.tip.color,
      timeout: (state) => state.tip.timeout,
    }),
  },
  methods: {
    ...mapMutations(["tip"]),
  },
};
</script>
