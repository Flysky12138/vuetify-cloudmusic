<template>
  <v-sheet>
    <v-btn
      v-for="name in names"
      :key="name.id"
      text
      rounded
      class="mr-6 text-subtitle-1 font-weight-bold"
      width="80"
    >
      {{ name }}
      <v-icon class="mt-1" color="grey lighten-1" small>
        {{ icons[0] }}
      </v-icon>
    </v-btn>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    names: ["首页", "歌单", "个性", "关于"],
    icons: ["mdi-chevron-down", "mdi-chevron-up"],
  }),
};
</script>
