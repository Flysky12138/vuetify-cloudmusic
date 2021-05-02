<template>
  <v-fab-transition>
    <v-btn fab dark color='blue lighten-2' v-scroll='onScroll' @click='goTo()' v-show='scrollTop >= 200'>
      <v-icon large>mdi-chevron-up</v-icon>
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
    goTo() {
      this.$vuetify.goTo(0, {
        duration: 400,
        offset: 0,
        easing: 'easeOutQuad'
      })
    }
  }
}
</script>
