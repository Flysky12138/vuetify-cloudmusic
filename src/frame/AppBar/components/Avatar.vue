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
        close-delay="100"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon :to="isLogin ? 'user' : 'login'" v-bind="attrs" v-on="on">
            <v-img
              v-if="isLogin"
              :src="avatarUrl"
              max-width="38"
              max-height="38"
            ></v-img>
            <v-icon v-else>mdi-account-outline</v-icon>
          </v-btn>
        </template>
        <v-card width="200">
          <v-card-title>
            {{ nickname }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            {{ signature }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="logout" class="mx-auto">
              logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-avatar>
  </v-badge>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      avatarUrl: (state) => state.user.profile.avatarUrl,
      number: (state) => state.user.messages.number,
      nickname: (state) => state.user.profile.nickname,
      signature: (state) => state.user.profile.signature,
    }),
  },
  methods: {
    logout() {
      this.$http.logout().then(() => {
        this.$store.commit("isLogin", false);
      });
    },
  },
};
</script>
