<template>
  <image-avatar
    v-if="islogin"
    :uid="user.uid"
    :src="user.avatarUrl"
    @contextmenu.native.prevent="logout"
  >
    <!-- 等级显示 -->
    <span
      class="mb-n1 align-self-end green--text text-caption font-weight-black font-italic"
    >
      {{ "Lv." + user.level }}
    </span>
  </image-avatar>
  <v-avatar v-else color="grey lighten-2" size="38">
    <v-btn icon to="/login">
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
  </v-avatar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ImageAvatar from "components/Image/ImageAvatar.vue";
export default {
  components: { ImageAvatar },
  data: () => ({}),
  computed: {
    ...mapState({
      islogin: (state) => state.islogin,
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapMutations({
      setLogout: "logout",
    }),
    logout() {
      this.$http.logout().then(() => {
        this.setLogout();
        this.$message({ text: "退出登录成功！", color: "primary" });
        this.$route.path !== "/" && this.$router.replace("/");
      });
    },
  },
};
</script>
