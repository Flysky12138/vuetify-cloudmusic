<template>
  <v-fab-transition>
    <v-btn small fab elevation="0" :color="$vuetify.theme.isDark ? '#1E1E1E' : 'white'" v-scroll="onScroll" @click="goTop" v-show="scrollTop >= 200">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data: () => ({
    scrollTop: 0
  }),
  methods: {
    onScroll(e) {
      this.scrollTop = e.target.documentElement.scrollTop
    },
    goTop() {
      this.$vuetify.goTo(0, {
        duration: 400,
        offset: 0,
        easing: 'easeOutQuad'
      })
    }
  }
}
</script>
