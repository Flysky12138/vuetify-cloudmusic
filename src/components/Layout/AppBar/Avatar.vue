<template>
  <v-avatar color="grey lighten-2" size="38">
    <v-btn icon @contextmenu.prevent="logout" :to="toRouter">
      <v-img
        v-if="islogin"
        :src="avatarUrl"
        max-width="38"
        max-height="38"
      ></v-img>
      <v-icon v-else>mdi-account-outline</v-icon>
    </v-btn>
  </v-avatar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      islogin: (state) => state.islogin,
      uid: (state) => state.user.uid,
      avatarUrl: (state) => state.user.avatarUrl,
    }),
    // 根据是否登录返回不同路由
    toRouter() {
      return this.islogin
        ? { path: "account", query: { uid: this.uid } }
        : "login";
    },
  },
  methods: {
    ...mapMutations({
      setLogout: "logout",
    }),
    logout() {
      if (this.islogin) {
        this.$http.logout().then(() => {
          this.setLogout();
          this.$router.replace("/");
        });
      }
    },
  },
};
</script>
