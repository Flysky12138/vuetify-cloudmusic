<template>
  <v-tooltip left open-delay="500" :disabled="tip === ''">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" @click="addPlay(value)" :disabled="disable">
        <v-icon>mdi-motion-play-outline</v-icon>
      </v-btn>
    </template>
    {{ tip }}
  </v-tooltip>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    value: { type: Array, required: true },
    tip: { type: String, default: "" },
    disable: { type: Boolean, default: false },
  },
  data: () => ({}),
  methods: {
    ...mapMutations(["addPlay"]),
  },
};
</script>
