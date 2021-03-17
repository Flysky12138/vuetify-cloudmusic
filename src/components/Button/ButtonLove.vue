<template>
  <v-btn icon @click="love">
    <v-icon v-if="islove" color="red">mdi-heart</v-icon>
    <v-icon v-else>mdi-heart-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
  },
  data: () => ({
    islove: false,
  }),
  methods: {
    love() {
      this.islove = !this.islove;
    },
  },
};
</script>
