<template>
  <v-container>
    <v-row class="pa-6">
      <v-col cols="1" class="text-center mt-5">
        <v-icon>mdi-video-input-component</v-icon>
      </v-col>
      <v-col cols="10">
        <about-api />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AboutApi from "./components/AboutApi.vue";
export default {
  components: { AboutApi },
  data: () => ({}),
};
</script>
