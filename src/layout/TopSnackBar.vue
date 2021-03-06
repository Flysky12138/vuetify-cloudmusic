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
import { mapState } from "vuex";
export default {
  data: () => ({
    isShow: false,
  }),
  computed: {
    ...mapState({
      text: (state) => state.topSnackBar.text,
      color: (state) => state.topSnackBar.color,
      timeout: (state) => state.topSnackBar.timeout,
    }),
  },
  watch: {
    text(newValue) {
      newValue !== "" ? (this.isShow = true) : (this.isShow = false);
    },
  },
};
</script>
