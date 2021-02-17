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
            clearInterval(this.interval);
            this.$refs.topSnack.value = "二维码已过期，将重新获取";
            this.qrimg = "";
            setTimeout(() => {
              this.getQRCode();
            }, 500);
            break;
          case 3:
            clearInterval(this.interval);
            this.$refs.topSnack.value = "授权登录成功";
            this.$refs.topSnack.color = "success";
            console.log(res.cookie);
            break;
        }
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
