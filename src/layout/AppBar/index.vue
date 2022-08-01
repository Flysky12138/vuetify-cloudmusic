<template>
  <v-container class="d-flex align-center">
    <!-- 按键 -->
    <button-router />
    <!-- 前进后退刷新 -->
    <history />
    <!-- 搜索框 -->
    <search class="mx-6" />
    <!-- 头像 -->
    <avatar />
  </v-container>
</template>

<script>
import ButtonRouter from './ButtonRouter.vue'
import Search from './Search.vue'
import Avatar from './Avatar.vue'
import History from './History.vue'
export default {
  components: { ButtonRouter, Search, Avatar, History },
  data: () => ({})
}
</script>
