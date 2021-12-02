<template>
  <v-fab-transition>
    <v-btn fab dark color='blue lighten-2' v-show='isShow' @click='locateMusic()'>
      <v-icon>mdi-crosshairs-gps</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
import { mapState } from 'vuex'
import { EventBus } from 'common/eventBus.js'
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      route: state => state.play.route,
      id: state => state.play.music.id
    }),
    isShow() {
      return ['/recommend', '/playlist'].includes(this.$route.path) && this.route === this.$route.fullPath
    }
  },
  watch: {
    id() {
      this.isShow && this.locateMusic()
    }
  },
  methods: {
    locateMusic() {
      EventBus.$emit('locateMusicEvent')
      setTimeout(
        () => {
          this.$vuetify.goTo('.playItem', {
            duration: 400,
            offset: 13,
            easing: 'easeOutQuad'
          })
        },
        document.querySelector('.playItem') ? 0 : 500
      )
    }
  }
}
</script>
