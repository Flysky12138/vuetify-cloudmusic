<template>
  <v-badge
    color="primary"
    :content="messages"
    :value="messages"
    overlap
    bordered
  >
    <v-avatar color="grey lighten-2" size="38">
      <v-btn icon :to="link.value[link.id]">
        <v-icon>{{ icon }}</v-icon>
        <!-- <v-img
          :src="require('assets/logo.svg')"
          max-width="25"
          max-height="25"
        ></v-img> -->
      </v-btn>
    </v-avatar>
  </v-badge>
</template>

<script>
export default {
  data: () => ({
    link: {
      id: 0,
      value: ["login", "user"],
    },
    messages: 0,
    icon: "mdi-account-outline",
  }),
  created() {
    setTimeout(() => {
      this.messages = 1;
    }, 2000);
  },
};
</script>
