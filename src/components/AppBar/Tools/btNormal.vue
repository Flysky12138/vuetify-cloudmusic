<template>
  <v-btn text rounded class="text-subtitle-1 font-weight-bold" width="80">
    {{ value.name }}
  </v-btn>
</template>

<script>
export default {
  props: {
    value: { type: Object, required: true },
  },
  data: () => ({}),
};
</script>
