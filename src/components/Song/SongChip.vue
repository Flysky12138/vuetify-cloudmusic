<template>
  <v-chip small v-text='value' @click='toRouter' :color='theChipColor'></v-chip>
</template>

<script>
export default {
  props: {
    value: { type: String, required: true }
  },
  data: () => ({}),
  computed: {
    theChipColor() {
      if (this.$route.query.cat === this.value) {
        return this.$vuetify.theme.isDark ? '#78909C' : 'cyan lighten-4'
      } else {
        return ''
      }
    }
  },
  methods: {
    toRouter() {
      this.$router.push({
        path: '/discover/playlist',
        query: {
          cat: this.value
        }
      })
    }
  }
}
</script>
