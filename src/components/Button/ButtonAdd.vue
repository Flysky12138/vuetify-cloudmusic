<template>
  <v-btn icon @click="play">
    <v-icon>mdi-plus-circle-outline</v-icon>
  </v-btn>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    value: { type: Number, required: true },
  },
  data: () => ({}),
  methods: {
    ...mapMutations({
      isPlay: "isPlay",
    }),
    play() {
      this.isPlay(this.value);
    },
  },
};
</script>
