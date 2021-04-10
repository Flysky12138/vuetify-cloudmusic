<template>
  <v-snackbar v-model="isShow" transition="slide-x-reverse-transition" right bottom class="mb-8 mr-8" elevation="12" :color="color" :timeout="timeout">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="isShow = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: { type: String, default: "", required: true },
    color: { type: String, default: "error" },
    timeout: { type: Number, default: 3000 }
  },
  data: () => ({
    isShow: false
  }),
  // 写在 created 中没有动画
  mounted() {
    this.isShow = true;
  }
};
</script>
