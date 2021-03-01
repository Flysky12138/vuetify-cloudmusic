<template>
  <v-container class="d-flex justify-center pt-16">
    <v-card
      :loading="loading"
      width="600"
      rounded="lg"
      style="overflow: hidden"
    >
      <!-- Card顶部进度条插槽 -->
      <template slot="progress">
        <v-progress-linear
          color="green"
          height="8"
          indeterminate
        ></v-progress-linear>
      </template>
      <!-- 标题 -->
      <v-card-title
        class="justify-center font-weight-bold text-h4 blue--text"
        v-text="title"
      ></v-card-title>
      <v-divider></v-divider>
      <!-- 切换选项卡 -->
      <v-tabs v-model="tab" color="basil" grow>
        <v-tab
          v-for="item in items"
          :key="item"
          class="font-weight-bold"
          v-text="item"
        ></v-tab>
      </v-tabs>
      <!-- 手机号、二维码 -->
      <v-tabs-items v-model="tab" vertical>
        <v-tab-item
          v-for="(item, index) in items"
          :key="index"
          :class="index === 0 ? 'py-12' : 'py-8'"
        >
          <component
            :is="index === 0 ? 'Phone' : 'QRcode'"
            @login="login"
            @loading="(res) => (loading = res)"
          ></component>
        </v-tab-item>
      </v-tabs-items>
      <!-- 加载提示圈 -->
      <v-overlay :value="overlay" opacity="0.75">
        <v-progress-circular
          indeterminate
          size="64"
          width="8"
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import Phone from "./components/Phone.vue";
import QRcode from "./components/QRcode.vue";
export default {
  components: { Phone, QRcode },
  data: () => ({
    tab: 0,
    title: "登录",
    items: ["手机号", "二维码"],
    loading: false,
    overlay: false,
  }),
  methods: {
    ...mapMutations({
      setLogin: "login",
    }),
    login() {
      this.overlay = true;
      // 获取ID,等级和头像
      this.$http.login.status().then((res) => {
        if (res.islogin) {
          this.setLogin(res);
          if (window.history.length <= 1) {
            this.$router.replace("/");
          } else {
            this.$router.go(-1);
          }
          this.overlay = false;
        }
      });
    },
  },
};
</script>
