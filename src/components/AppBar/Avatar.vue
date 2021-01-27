<template>
  <v-avatar color="grey lighten-2" size="38">
    <v-icon>{{ icons.default }}</v-icon>
  </v-avatar>
</template>

<script>
export default {
  data: () => ({
    icons: { default: "mdi-biohazard", user: "mdi-cannabis" },
  }),
};
</script>
