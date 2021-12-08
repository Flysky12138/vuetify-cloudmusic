<template>
  <div>
    <v-btn icon small @click='leftBtn'>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn icon small class='mx-3' @click='refreshBtn'>
      <v-icon size='20'>mdi-refresh</v-icon>
    </v-btn>
    <v-btn icon small @click='rightBtn'>
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    leftBtn() {
      window.history.back()
    },
    refreshBtn() {
      window.history.go()
    },
    rightBtn() {
      window.history.forward()
    }
  }
}
</script>
