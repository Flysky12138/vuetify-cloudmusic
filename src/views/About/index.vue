<template>
  <v-container class="pa-12">
    <v-row>
      <v-col cols="12" v-for="item in components" :key="item.id">
        <component :is="item"></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AboutApi from "./components/AboutApi.vue";
import AboutTheme from "./components/AboutTheme.vue";
import AboutError from "./components/AboutError.vue";
export default {
  components: { AboutApi, AboutTheme, AboutError },
  data: () => ({
    components: ["AboutError", "AboutApi", "AboutTheme"],
  }),
};
</script>
