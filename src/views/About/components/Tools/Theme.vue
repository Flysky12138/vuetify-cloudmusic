<template>
  <div class='d-flex align-center'>
    <span class='mr-2'>夜间模式：</span>
    <v-switch v-model='value' inset class='ma-0 pa-0' hide-details></v-switch>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: false // isDark?
  }),
  created() {
    this.value = this.$vuetify.theme.isDark ? true : false
  },
  watch: {
    value(newValue) {
      this.$vuetify.theme.isDark = newValue
      localStorage.setItem('isDark', JSON.stringify(newValue))
      newValue ? this.setMeta('#272727') : this.setMeta('#ffffff')
    }
  },
  methods: {
    setMeta(content) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', content)
    }
  }
}
</script>
