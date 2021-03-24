<template>
  <v-container class="pa-12">
    <v-row>
      <v-col cols="1" class="text-center mt-5">
        <v-icon>mdi-resistor</v-icon>
      </v-col>
      <v-col cols="10">
        <about-api />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1" class="text-center mt-5">
        <v-icon>mdi-cog-outline</v-icon>
      </v-col>
      <v-col cols="10">
        <about-theme />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AboutApi from "./components/AboutApi.vue";
import AboutTheme from "./components/AboutTheme.vue";
export default {
  components: { AboutApi, AboutTheme },
  data: () => ({}),
};
</script>
