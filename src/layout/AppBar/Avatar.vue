<template>
  <image-avatar
    v-if="islogin"
    :uid="uid"
    :src="avatarUrl"
    @contextmenu.native.prevent="logout"
  />
  <v-avatar v-else color="grey lighten-2" size="38">
    <v-btn icon to="login">
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
      uid: (state) => state.user.uid,
      avatarUrl: (state) => state.user.avatarUrl,
    }),
  },
  methods: {
    ...mapMutations({
      setLogout: "logout",
    }),
    logout() {
      if (this.islogin) {
        this.$http.logout().then(() => {
          this.setLogout();
          this.$route.path !== "/" && this.$router.replace("/");
        });
      }
    },
  },
};
</script>
