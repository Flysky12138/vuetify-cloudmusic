<template>
  <v-container>
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
        ></v-text-field>
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
          @keyup.13="login"
        ></v-text-field>
      </v-col>
      <!-- 提示 -->
      <top-snack ref="topSnack" />
    </v-row>
  </v-container>
</template>

<script>
import TopSnack from "components/TopSnack.vue";
export default {
  components: { TopSnack },
  data: () => ({
    phone: { value: "", inputTrue: false },
    password: { value: "", isShow: false, disabled: true },
    rules: new RegExp("^(13[0-9]|14[5|7]|15[0-9]|18[0-3|5-9])\\d{8}$"),
  }),
  watch: {
    "phone.value"(newValue) {
      // 号码正确
      if (this.rules.test(newValue)) {
        // 且已注册
        this.$http.login.check(newValue).then((res) => {
          if (res) {
            this.phone.inputTrue = true;
          } else {
            this.$refs.topSnack.text =
              "该手机号未注册 【 " + this.phone.value + " 】";
            this.$refs.topSnack.color = "primary";
          }
        });
      } else {
        this.phone.inputTrue = false;
        this.$refs.topSnack.text = "";
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
    login() {
      if (this.password.value !== "") {
        this.$http.login
          .cellphone(this.phone.value, this.password.value)
          .then((res) => {
            switch (res) {
              case 0:
                this.$refs.topSnack.text = "密码错误";
                this.password.value = "";
                break;
              case 1: // 登录成功
                this.$emit("isLogin");
                break;
              case 2:
                this.$refs.topSnack.text = "当前登录失败，请稍后再试";
                break;
              case 3:
                this.$refs.topSnack.text = "密码错误超过限制，请换二维码登录";
                break;
            }
          });
      }
    },
  },
};
</script>
