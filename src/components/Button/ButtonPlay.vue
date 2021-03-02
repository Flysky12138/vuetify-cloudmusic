<template>
  <div>
    <template v-if="tip !== ''">
      <v-tooltip left open-delay="800">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="a">
            <v-icon>mdi-motion-play-outline</v-icon>
          </v-btn>
        </template>
        {{ tip }}
      </v-tooltip>
    </template>
    <template v-else>
      <v-btn icon @click="a">
        <v-icon>mdi-motion-play-outline</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    value: { type: [Number, Array], required: true },
    tip: { type: String, default: "" },
  },
  data: () => ({}),
  methods: {
    ...mapState({
      isplay: (state) => state.isplay,
    }),
    a() {
      console.log(this.value);
    },
  },
};
</script>
