<template>
  <v-btn small fab elevation='0' :color='$vuetify.theme.isDark ? "#1E1E1E" : "white"' @click='locateMusic'>
    <v-icon size='20'>mdi-adjust</v-icon>
  </v-btn>
</template>

<script>
import { EventBus } from '@/common/eventBus.js'
export default {
  data: () => ({}),
  methods: {
    locateMusic() {
      EventBus.$emit('locateMusicEvent')
    }
  }
}
</script>
