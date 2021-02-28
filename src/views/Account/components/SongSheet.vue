<template>
  <v-card rounded="lg" elevation="2">
    <v-card-title>
      {{ title + "（" + 4 + "）" }}
    </v-card-title>
    <v-card-text class="d-flex" style="overflow: auto">
      <div v-for="(item, index) in 20" :key="index">
        <v-img
          max-width="100"
          :src="require('assets/logo.svg')"
          class="ma-3"
        ></v-img>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "", required: true },
  },
  data: () => ({}),
};
</script>
