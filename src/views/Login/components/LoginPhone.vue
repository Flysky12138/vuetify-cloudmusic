<template>
  <v-container>
    <v-row justify='center'>
      <!-- 手机号输入 -->
      <v-col cols='7' sm='4'>
        <v-text-field label='手机号' prefix='+86' counter='11' maxlength='11' clearable autofocus v-model='phone.value' :success='phone.inputTrue'></v-text-field>
      </v-col>
      <!-- 布局占位 -->
      <v-col cols='1' class='hidden-xs-only'></v-col>
      <!-- 密码输入 -->
      <v-col cols='7' sm='4'>
        <v-text-field
          label='密码/验证码'
          :hint='password.value ? "回车确认登录" : "此时回车可获取验证码"'
          ref='Code'
          counter
          :append-icon='password.isShow ? "mdi-eye" : "mdi-eye-off"'
          @click:append='password.isShow = !password.isShow'
          :type='password.isShow ? "text" : "password"'
          :disabled='password.disabled'
          v-model='password.value'
          @keyup.enter='enter'
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    phone: { value: '', inputTrue: false },
    password: { value: '', isShow: false, disabled: true },
    rules: new RegExp('^1((3[3-9])|(4[579])|(5[0-35-9])|(7[013678])|(9\\d))\\d{8}$')
  }),
  watch: {
    'phone.value'(newValue) {
      // 号码正确
      if (this.rules.test(newValue)) {
        // 且已注册
        this.$http.login.check(newValue).then(res => {
          if (res) {
            this.phone.inputTrue = true
          } else {
            this.$message({
              text: '该手机号未注册 【 ' + this.phone.value + ' 】',
              color: 'primary'
            })
          }
        })
      } else if (newValue && newValue.length === 11) {
        this.$message({ text: '这是手机号？' })
      } else {
        this.phone.inputTrue = false
      }
    },
    'phone.inputTrue'(newValue) {
      if (newValue) {
        this.password.disabled = false
        setTimeout(() => {
          this.$refs.Code.focus()
        }, 500)
      } else {
        this.password.value = ''
        this.password.disabled = true
      }
    }
  },
  methods: {
    enter() {
      if (this.password.value) {
        ;/\d{4}/.test(this.password.value) ? this.captchaLogin() : this.phoneLogin()
      } else {
        this.$http.login.captcha(this.phone.value).then(res => {
          if (res.data) {
            this.password.disabled = false
            this.$message({ text: '已发送验证码，请注意查收', color: 'success' })
          } else {
            this.$message({ text: res.message })
          }
        })
      }
    },
    // 验证码登录
    captchaLogin() {
      this.$http.login.cellphone
        .captcha(this.phone.value, this.password.value)
        .then(res => {
          this.$emit('login', res.cookie)
        })
        .catch(err => {
          this.$message({ text: err })
        })
    },
    // 手机号登陆
    phoneLogin() {
      this.$http.login.cellphone
        .password(this.phone.value, this.password.value)
        .then(res => {
          switch (res.code) {
            case 0:
              this.$message({ text: '密码错误' })
              this.password.value = ''
              break
            case 1: // 登录成功
              this.$emit('login', res.cookie)
              break
            case 2:
              this.$message({ text: '当前登录失败，请稍后再试' })
              break
            case 3:
              this.$message({ text: '密码错误超过限制，请换二维码登录' })
              break
          }
        })
        .catch(err => {
          this.$message({ text: err + '，或换二维码登录' })
        })
    }
  }
}
</script>
