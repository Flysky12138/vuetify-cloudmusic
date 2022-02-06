<template>
  <v-container class='d-flex justify-center py-16'>
    <v-card :loading='loading' width='600' rounded='lg' class='overflow-hidden'>
      <!-- Card顶部进度条插槽 -->
      <template slot='progress'>
        <v-progress-linear color='green' height='8' indeterminate></v-progress-linear>
      </template>
      <!-- 标题 -->
      <v-card-title class='justify-center font-weight-bold text-h4 blue--text'>登录</v-card-title>
      <v-divider></v-divider>
      <!-- 切换选项卡 -->
      <v-tabs v-model='tab' color='basil' grow>
        <v-tab class='font-weight-bold'>手机号</v-tab>
        <v-tab class='font-weight-bold'>二维码</v-tab>
      </v-tabs>
      <!-- 手机号、二维码 -->
      <v-tabs-items v-model='tab' vertical>
        <v-tab-item class='py-12'>
          <component is='LoginPhone' @login='userlogin'></component>
        </v-tab-item>
        <v-tab-item class='py-8'>
          <component is='LoginQR' @login='userlogin' @loading='loading = $event'></component>
        </v-tab-item>
      </v-tabs-items>
      <!-- 加载提示圈 -->
      <v-overlay :value='overlay' opacity='0.75'>
        <v-progress-circular indeterminate size='64' width='8'></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-container>
</template>

<script>
import { userStore } from '@/plugins/store/user'
import { mapActions } from 'pinia'
import LoginPhone from './components/LoginPhone.vue'
import LoginQR from './components/LoginQR.vue'
export default {
  components: { LoginPhone, LoginQR },
  data: () => ({
    tab: 0,
    loading: false,
    overlay: false,
    fullPath: '/' // 登陆后的跳转路由
  }),
  methods: {
    ...mapActions(userStore, ['login', 'setInfo']),
    userlogin(cookie) {
      this.overlay = true
      this.login(cookie)
      // 获取ID,等级和头像
      this.$http.login.status().then(res => {
        this.setInfo(res)
        this.overlay = false
        this.$message({ text: '登录成功，欢迎使用！', color: 'success' })
        this.$router.replace(this.fullPath)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fullPath = from.fullPath
    })
  }
}
</script>
