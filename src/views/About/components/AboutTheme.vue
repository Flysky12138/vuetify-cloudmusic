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
    <v-row>
      <v-col cols="auto">
        <v-switch
          v-model="value"
          inset
          :label="value ? '深色' : '浅色'"
          class="ma-0 ml-1"
        ></v-switch>
      </v-col>
    </v-row>
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
  watch: {
    value(newValue) {
      this.$vuetify.theme.isDark = newValue;
      localStorage.setItem("isDark", JSON.stringify(newValue));
    },
  },
};
</script>
