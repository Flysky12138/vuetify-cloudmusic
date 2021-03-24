<template>
  <v-container>
    <v-alert
      border="left"
      colored-border
      elevation="1"
      dense
      color="cyan"
      colored-border
      icon="mdi-theme-light-dark"
    >
      主题色
    </v-alert>
    <v-icon color="blue lighten-2" @click="onClick">{{ theTheme }}</v-icon>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    value: false, // isDark?
  }),
  created() {
    this.value = this.$vuetify.theme.isDark ? true : false;
  },
  computed: {
    theTheme() {
      return this.value
        ? "mdi-moon-waxing-crescent"
        : "mdi-white-balance-sunny";
    },
  },
  methods: {
    onClick() {
      this.value = !this.value;
      this.$vuetify.theme.isDark = this.value;
      localStorage.setItem("isDark", JSON.stringify(this.value));
    },
  },
};
</script>
