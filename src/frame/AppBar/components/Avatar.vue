<template>
  <v-badge
    color="primary"
    :content="$store.state.user.messages.number"
    :value="$store.state.user.messages.number ? true : false"
    overlap
    bordered
  >
    <v-avatar color="grey lighten-2" size="38">
      <v-btn icon :to="choiceRouter">
        <v-img
          v-if="$store.state.isLogin"
          :src="$store.state.user.profile.avatarUrl"
          max-width="38"
          max-height="38"
        ></v-img>
        <v-icon v-else>{{ icon }}</v-icon>
      </v-btn>
    </v-avatar>
  </v-badge>
</template>

<script>
export default {
  data: () => ({
    icon: "mdi-account-outline",
  }),
  computed: {
    choiceRouter() {
      return this.$store.state.isLogin ? "user" : "login";
    },
  },
};
</script>
