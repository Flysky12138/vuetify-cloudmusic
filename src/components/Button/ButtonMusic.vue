<template>
  <div>
    <v-btn icon>
      <v-icon>mdi-page-first</v-icon>
    </v-btn>
    <v-btn
      icon
      large
      class="mx-3"
      style="background-color: rgba(90, 90, 90, 0.1)"
      @click="isplay = !isplay"
    >
      <v-icon v-if="isplay">mdi-pause</v-icon>
      <v-icon v-else>mdi-play</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-page-last</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    isplay: false,
  }),
};
</script>
