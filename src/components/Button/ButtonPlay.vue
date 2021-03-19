<template>
  <div>
    <template v-if="tip !== ''">
      <v-tooltip left open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="play">
            <v-icon>mdi-motion-play-outline</v-icon>
          </v-btn>
        </template>
        {{ tip }}
      </v-tooltip>
    </template>
    <template v-else>
      <v-btn icon @click="play">
        <v-icon>mdi-motion-play-outline</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    id: { type: [Number, Array], required: true },
    tip: { type: String, default: "" },
  },
  data: () => ({}),
  methods: {
    ...mapMutations(["addPlay"]),
    play() {
      this.addPlay(this.id);
    },
  },
};
</script>
