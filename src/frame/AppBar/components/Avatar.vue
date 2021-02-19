<template>
  <v-badge
    color="primary"
    :content="number"
    :value="number ? true : false"
    overlap
    bordered
  >
    <v-avatar color="grey lighten-2" size="38">
      <v-menu
        offset-y
        :open-on-hover="isLogin"
        open-delay="500"
        :disabled="!isLogin"
        rounded="lg"
        left
        transition="slide-y-transition"
        nudge-bottom="10"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon :to="choiceRouter" v-bind="attrs" v-on="on">
            <v-img
              v-if="isLogin"
              :src="avatarUrl"
              max-width="38"
              max-height="38"
            ></v-img>
            <v-icon v-else>{{ icon }}</v-icon>
          </v-btn>
        </template>
        <v-list width="200">
          <v-list-item>
            <v-list-item-title>
              {{ $store.state.user.profile.nickname }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-avatar>
  </v-badge>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    icon: "mdi-account-outline",
  }),
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      avatarUrl: (state) => state.user.profile.avatarUrl,
      number: (state) => state.user.messages.number,
    }),
    choiceRouter() {
      return this.isLogin ? "user" : "login";
    },
  },
};
</script>
