<template>
  <v-sheet>
    <v-avatar color="grey lighten-2" size="38">
      <v-icon>{{ icons[0] }}</v-icon>
    </v-avatar>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-biohazard"],
  }),
};
</script>
