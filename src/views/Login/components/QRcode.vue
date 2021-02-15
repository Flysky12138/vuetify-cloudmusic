<template>
  <v-container>
    <v-row justify="center" v-intersect="clearInterval">
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
    success: false,
  }),
  created() {
    this.getQRCode();
  },
  methods: {
    // 生成二维码
    getQRCode() {
      this.$http.qr.key().then((res) => {
        this.unikey = res.data.unikey;
        this.$http.qr.create(this.unikey).then((res) => {
          this.qrimg = res.data.qrimg;
        });
      });
    },
    // 检测二维码扫码状态
    checkQRCodeStatus() {
      this.interval = setInterval(() => {
        if (this.qrimg === "") {
          this.getQRCode();
          return;
        }
        this.$http.qr.check(this.unikey).then((res) => {
          switch (res.code) {
            case 800: // 二维码过期
              this.$refs.topSnack.value = "二维码过期，已重新获取";
              this.qrimg = "";
              this.getQRCode();
              break;
            case 801: // 等待扫码
              break;
            case 802: // 待确认
              break;
            case 803: // 授权成功
              this.$refs.topSnack.value = "授权成功";
              this.$refs.topSnack.color = "success";
              clearInterval(this.interval);
              this.success = true;
              break;
          }
          console.log(res);
        });
      }, 2000);
    },
    // 是否在二维码界面
    clearInterval(entries) {
      if (entries[0].isIntersecting) {
        this.checkQRCodeStatus();
      } else {
        clearInterval(this.interval);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
