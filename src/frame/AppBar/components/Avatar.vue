<template>
  <!-- 右上角消息徽章 -->
  <v-badge
    color="primary"
    :content="number"
    :value="isLogin ? true : false"
    overlap
    bordered
  >
    <!-- 头像 -->
    <v-avatar color="grey lighten-2" size="38">
      <!-- 用户信息跳转按键 -->
      <v-btn v-if="isLogin" icon to="account" @contextmenu.prevent="logout">
        <v-img :src="avatarUrl" max-width="38" max-height="38"></v-img>
      </v-btn>
      <!-- 登陆界面 -->
      <login v-else @is="login" />
    </v-avatar>
  </v-badge>
</template>

<script>
import { mapState } from "vuex";
import Login from "./Login";
export default {
  components: { Login },
  data: () => ({}),
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      avatarUrl: (state) => state.user.profile.avatarUrl,
      number: (state) => state.user.messages.number,
    }),
  },
  methods: {
    login() {
      // 获取账号信息
      this.$http.user.account().then((res) => {
        this.$store.commit("user/userInformation", res);
        setTimeout(() => {
          this.$store.commit("isLogin", true);
        }, 2000);
      });
    },
    logout() {
      this.$http.logout().then(() => {
        this.$store.commit("isLogin", false);
      });
    },
  },
};
</script>
