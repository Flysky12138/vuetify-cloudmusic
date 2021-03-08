<template>
  <v-container>
    <v-row class="pt-6 pl-6">
      <v-col cols="5">
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
