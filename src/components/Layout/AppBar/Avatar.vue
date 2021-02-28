<template>
  <v-avatar color="grey lighten-2" size="38">
    <!-- 用户界面 -->
    <v-btn
      v-if="islogin"
      icon
      :to="{ path: 'account', query: { uid: uid } }"
      @contextmenu.prevent="logout"
    >
      <v-img :src="avatarUrl" max-width="38" max-height="38"></v-img>
    </v-btn>
    <!-- 登陆界面 -->
    <login v-else @is="login" :height="40">
      <v-icon>mdi-account-outline</v-icon>
    </login>
  </v-avatar>
</template>

<script>
import Login from "./Login";
import { mapState, mapMutations } from "vuex";
export default {
  components: { Login },
  data: () => ({}),
  computed: {
    ...mapState({
      islogin: (state) => state.islogin,
      uid: (state) => state.user.uid,
      avatarUrl: (state) => state.user.avatarUrl,
    }),
  },
  methods: {
    ...mapMutations({
      setLogin: "login",
      setLogout: "logout",
    }),
    login() {
      // 获取ID,等级和头像
      this.$http.login.status().then((res) => {
        if (res.islogin) {
          this.setLogin(res);
        }
      });
    },
    logout() {
      this.$http.logout().then(() => {
        this.setLogout();
        // this.$router.replace("/");
      });
    },
  },
};
</script>
