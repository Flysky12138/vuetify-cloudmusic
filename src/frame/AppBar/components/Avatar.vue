<template>
  <!-- 右上角消息徽章 -->
  <v-badge
    color="blue lighten-1"
    :content="newsAmount"
    :value="islogin ? true : false"
    overlap
    bordered
    transition="scroll-x-reverse-transition"
  >
    <!-- 头像 -->
    <v-avatar color="grey lighten-2" size="38">
      <!-- 用户界面 -->
      <v-btn v-if="islogin" icon to="account" @contextmenu.prevent="logout">
        <v-img :src="avatarUrl" max-width="38" max-height="38"></v-img>
      </v-btn>
      <!-- 登陆界面 -->
      <login v-else @is="login" :height="40">
        <v-icon>mdi-account-outline</v-icon>
      </login>
    </v-avatar>
  </v-badge>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Login from "./Login";
export default {
  components: { Login },
  data: () => ({}),
  computed: {
    ...mapState({
      islogin: (state) => state.islogin,
      avatarUrl: (state) => state.user.profile.avatarUrl,
      newsAmount: (state) => state.user.newsAmount,
    }),
  },
  methods: {
    ...mapMutations({
      isLogin: "isLogin",
      detail: "user/detail",
    }),
    login() {
      // 获取账号信息
      this.$http.login.status().then((res) => {
        if (res.islogin) {
          this.$http.user.detail(res.id).then((res) => {
            this.detail(res);
            this.isLogin(true);
          });
        }
      });
    },
    logout() {
      this.$http.logout().then(() => {
        this.isLogin(false);
        this.$router.replace("/");
      });
    },
  },
};
</script>
