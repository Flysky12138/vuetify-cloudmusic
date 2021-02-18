<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-img :src="qrimg"></v-img>
      </v-col>
    </v-row>
    <top-snack ref="topSnack" />
  </v-container>
</template>

<script>
import TopSnack from "components/Tips/TopSnack.vue";
export default {
  components: { TopSnack },
  data: () => ({
    unikey: "",
    qrimg: "",
    interval: {},
  }),
  created() {
    this.getQRCode();
  },
  methods: {
    // 生成二维码
    getQRCode() {
      this.$http.qr.key().then((res) => {
        this.unikey = res;
        this.$http.qr.create(this.unikey).then((res) => {
          this.qrimg = res;
          this.interval = setInterval(() => {
            this.checkQRCodeStatus();
          }, 2000);
        });
      });
    },
    // 检测二维码扫码状态
    checkQRCodeStatus() {
      this.$http.qr.check(this.unikey).then((res) => {
        switch (res.code) {
          case 0:
            this.$refs.topSnack.value = "二维码已过期，将重新获取";
            this.qrimg = "";
            clearInterval(this.interval);
            setTimeout(() => {
              this.getQRCode();
            }, 500);
            break;
          case 3:
            this.$refs.topSnack.value = "授权登录成功";
            this.$refs.topSnack.color = "success";
            this.getAccountInformation();
            clearInterval(this.interval);
            break;
        }
      });
    },
    // 获取账号信息
    getAccountInformation() {
      this.$http.account().then((res) => {
        this.$store.commit("isLogin", true);
        this.$store.commit("user/userInformation", res);
        this.$router.push("/");
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
