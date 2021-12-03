<template>
  <v-btn small fab elevation='0' :color='$vuetify.theme.isDark ? "#1E1E1E" : "white"' @click='locateMusic'>
    <v-icon size='20'>mdi-adjust</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'
import { EventBus } from 'common/eventBus.js'
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      id: state => state.play.music.id
    })
  },
  watch: {
    id: 'locateMusic'
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
