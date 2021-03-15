<template>
  <v-container>
    <v-row class="pa-6">
      <v-col cols="1" class="text-center mt-5">
        <v-icon>mdi-video-input-component</v-icon>
      </v-col>
      <v-col cols="10">
        <about-api />
        <div class="my-3"></div>
        <about-proxy />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AboutApi from "./components/AboutApi.vue";
import AboutProxy from "./components/AboutProxy.vue";
export default {
  components: { AboutApi, AboutProxy },
  data: () => ({}),
};
</script>
