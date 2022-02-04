<template>
  <v-container class='d-flex align-center'>
    <!-- 按键 -->
    <button-router />
    <!-- 前进后退刷新 -->
    <history />
    <!-- 搜索框 -->
    <search class='mx-6' />
    <!-- 头像 -->
    <avatar />
  </v-container>
</template>

<script>
export default {
  components: {
    ButtonRouter: () => import('./ButtonRouter.vue'),
    Search: () => import('./Search.vue'),
    Avatar: () => import('./Avatar.vue'),
    History: () => import('./History.vue')
  },
  data: () => ({})
}
</script>
