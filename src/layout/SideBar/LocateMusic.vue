<template>
  <v-btn small fab elevation="0" :color="$vuetify.theme.isDark ? '#1E1E1E' : 'white'" @click="locateMusic">
    <v-icon size="20">mdi-adjust</v-icon>
  </v-btn>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    locateMusic() {
      this.$bus.$emit('locateMusicEvent')
    }
  }
}
</script>
