<template>
  <v-btn icon @click="a">
    <v-icon>mdi-plus-circle-outline</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    value: { type: Number, required: true },
  },
  data: () => ({}),
  methods: {
    a() {
      console.log(this.value);
    },
  },
};
</script>
