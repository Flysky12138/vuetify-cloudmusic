<template>
  <v-alert border='left' colored-border elevation='1' dense color='cyan' icon='mdi-theme-light-dark'>
    <v-row>
      <v-col cols='auto'>夜间模式</v-col>
      <v-col>
        <v-switch v-model='value' inset class='ma-0 pa-0' hide-details></v-switch>
      </v-col>
    </v-row>
  </v-alert>
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
    }
  }
}
</script>
