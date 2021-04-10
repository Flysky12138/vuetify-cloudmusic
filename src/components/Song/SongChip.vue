<template>
  <v-chip small v-text="value" @click="toRouter"></v-chip>
</template>

<script>
export default {
  props: {
    value: { type: String, required: true }
  },
  data: () => ({}),
  methods: {
    toRouter() {
      this.$router.push({
        path: "/discover/playlist",
        query: {
          cat: this.value
        }
      });
    }
  }
};
</script>
