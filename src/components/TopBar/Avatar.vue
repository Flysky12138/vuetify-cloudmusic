<template>
  <v-avatar color="grey lighten-2" size="38">
    <v-btn icon :to="link.value[link.id]">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
  </v-avatar>
</template>

<script>
export default {
  data: () => ({
    link: {
      id: 0,
      value: ["login", "user"],
    },
    icon: "mdi-account-outline",
  }),
};
</script>
