<template>
  <v-row justify="center">
    <!-- 手机号输入 -->
    <v-col cols="7" sm="4">
      <v-text-field
        label="手机号"
        prefix="+86"
        counter="11"
        maxlength="11"
        clearable
        autofocus
        v-model="phone.value"
        :success="phone.inputTrue"
      >
      </v-text-field>
    </v-col>

    <!-- 布局占位 -->
    <v-col cols="1" class="hidden-xs-only"></v-col>

    <!-- 密码输入 -->
    <v-col cols="7" sm="4">
      <v-text-field
        label="密码"
        hint="回车确认登录"
        ref="Code"
        counter
        :append-icon="password.isShow ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="password.isShow = !password.isShow"
        :type="password.isShow ? 'text' : 'password'"
        :disabled="password.disabled"
        v-model="password.value"
        @keydown="login"
      >
      </v-text-field>
    </v-col>

    <!-- 提示 -->
    <top-snack ref="topSnack" />
  </v-row>
</template>

<script>
import TopSnack from "components/Tips/TopSnack.vue";
export default {
  components: { TopSnack },
  data: () => ({
    phone: { value: "", inputTrue: false },
    password: { value: "", isShow: false, disabled: true },
    rules: new RegExp(
      "^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$"
    ),
  }),
  watch: {
    "phone.value"(newValue) {
      // 号码正确且已注册
      if (this.rules.test(newValue)) {
        this.$http.check(newValue).then((res) => {
          if (res) {
            this.phone.inputTrue = true;
          } else {
            this.$refs.topSnack.value =
              "该手机号未注册 【 " + this.phone.value + " 】";
          }
        });
      } else {
        this.phone.inputTrue = false;
      }
    },
    "phone.inputTrue"(newValue) {
      if (newValue) {
        this.password.disabled = false;
        setTimeout(() => {
          this.$refs.Code.focus();
        }, 500);
      } else {
        this.password.value = "";
        this.password.disabled = true;
      }
    },
  },
  methods: {
    login(event) {
      if (this.password.value !== "" && event.keyCode === 13) {
        this.$http
          .cellphone(this.phone.value, this.password.value)
          .then((res) => {
            if (res.code === 0) {
              this.$refs.topSnack.color = "error";
              this.$refs.topSnack.value = "密码错误";
              this.password.value = "";
            } else if (res.code === 1) {
              this.$refs.topSnack.color = "success";
              this.$refs.topSnack.value =
                "登录成功，当前用户 【 " + res.nickname + " 】";
              console.log(res.cookie);
            } else if (res.code === 2) {
              this.$refs.topSnack.color = "error";
              this.$refs.topSnack.value = "当前登录失败，请稍后再试";
            } else if (res.code === 3) {
              this.$refs.topSnack.color = "error";
              this.$refs.topSnack.value = "密码错误超过限制，请换二维码登录";
            }
          });
      }
    },
  },
};
</script>
