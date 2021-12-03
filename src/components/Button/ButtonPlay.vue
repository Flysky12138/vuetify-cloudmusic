<template>
  <v-tooltip left open-delay='500' :disabled='tip === ""'>
    <template v-slot:activator='{ on }'>
      <v-btn icon v-on='on' @click='addID(id);saveRoute($route.fullPath)' :disabled='disable' style='color: inherit'>
        <v-icon>mdi-motion-play-outline</v-icon>
      </v-btn>
    </template>
    {{ tip }}
  </v-tooltip>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  props: {
    id: { type: Array, required: true },
    tip: { type: String, default: '' },
    disable: { type: Boolean, default: false }
  },
  data: () => ({}),
  methods: {
    ...mapActions(['addID']),
    ...mapMutations(['saveRoute'])
  }
}
</script>
