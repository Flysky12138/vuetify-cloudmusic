<template>
  <v-row justify="center">
    <!-- 手机号输入 -->
    <v-col cols="7" sm="5">
      <v-text-field
        :label="label[0]"
        prefix="+86"
        counter="11"
        maxlength="11"
        clearable
        autofocus
        v-model="value.phone"
        :success="inputTrue"
      ></v-text-field>
    </v-col>
    <!-- 布局占位 -->
    <v-col cols="1" class="hidden-xs-only"></v-col>
    <!-- 验证码输入 -->
    <v-col cols="7" sm="3">
      <v-text-field
        :label="label[1]"
        maxlength="5"
        counter="5"
        :disabled="!inputTrue"
        ref="Code"
        v-model="value.code"
      >
        <template v-slot:append-outer>
          <v-progress-circular
            indeterminate
            color="blue"
            size="25"
            width="2"
            v-show="time.isShowTime"
            @click="value.code = ''"
          >
            <span class="caption">{{ time.value }}</span>
          </v-progress-circular>
        </template>
      </v-text-field>
    </v-col>
    <!-- 验证码发送提示 -->
    <v-snackbar
      v-model="snackbar.isShow"
      timeout="3000"
      shaped
      fixed
      top
      transition="scroll-y-transition"
      class="mt-3"
      color="success"
    >
      <p class="subtitle-2 text-center ma-0">
        {{ snackbar.text }} - {{ value.phone }}
      </p>
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    label: ["手机号", "验证码"],
    value: {
      phone: "",
      code: "",
    },
    inputTrue: false,
    time: {
      value: 60,
      isShowTime: false,
      interval: {},
    },
    snackbar: {
      isShow: false,
      text: "验证码已发送至",
    },
    rules: new RegExp(
      "^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$"
    ),
  }),
  watch: {
    "value.phone"(newValue) {
      if (this.rules.test(newValue)) {
        this.inputTrue = true;
        setTimeout(() => {
          this.getCode();
          this.countDown();
          this.time.isShowTime = true;
          this.snackbar.isShow = true;
          this.$refs.Code.focus();
        }, 800);
      } else {
        this.inputTrue = false;
      }
    },
    inputTrue(newValue, oldValue) {
      // 输入值由正确变错误
      if (!newValue && oldValue) {
        this.value.code = "";
        this.time.isShowTime = false;
        this.snackbar.isShow = false;
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.time.interval);
  },
  methods: {
    // 获取验证码
    getCode() {},
    // 倒计时
    countDown() {
      clearInterval(this.time.interval);
      this.time.value = 60;
      this.time.interval = setInterval(() => {
        this.time.value--;
        if (this.time.value === 0) {
          clearInterval(this.time.interval);
          this.time.isShowTime = false;
        }
      }, 1000);
    },
  },
};
</script>
