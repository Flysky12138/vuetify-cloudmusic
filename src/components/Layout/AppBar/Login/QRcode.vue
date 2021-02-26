<template>
  <v-container>
    <v-row justify="center" v-intersect="onIntersect">
      <v-col cols="6">
        <v-img :src="qrimg"></v-img>
      </v-col>
    </v-row>
    <!-- 提示 -->
    <top-snack ref="topSnack" />
  </v-container>
</template>

<script>
import TopSnack from "components/TopSnack.vue";
export default {
  components: { TopSnack },
  data: () => ({
    unikey: "",
    qrimg: "",
    interval: {},
  }),
  methods: {
    // 是否在二维码界面
    onIntersect(entries) {
      if (entries[0].isIntersecting) {
        this.getQRCode();
      } else {
        clearInterval(this.interval);
      }
    },
    // 生成二维码
    getQRCode() {
      this.$http.login.qr.key().then((res) => {
        this.unikey = res;
        this.$http.login.qr.create(this.unikey).then((res) => {
          this.qrimg = res;
          this.interval = setInterval(() => {
            this.checkQRCodeStatus();
          }, 2000);
        });
      });
    },
    // 检测二维码扫码状态
    checkQRCodeStatus() {
      this.$http.login.qr.check(this.unikey).then((res) => {
        switch (res) {
          case 0: // 二维码过期
            this.$emit("isQrWait", false);
            this.$refs.topSnack.color = "primary";
            this.$refs.topSnack.text = "二维码已过期，将重新获取";
            this.qrimg = "";
            clearInterval(this.interval);
            setTimeout(() => {
              this.getQRCode();
            }, 500);
            break;
          case 2: // 等待确认
            this.$emit("isQrWait", true);
            break;
          case 3: // 扫码成功
            this.$emit("isQrWait", false);
            this.$emit("isLogin");
            clearInterval(this.interval);
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
