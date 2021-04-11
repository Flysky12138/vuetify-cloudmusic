<template>
  <v-container class='d-flex align-center'>
    <!-- 按键 -->
    <button-router />
    <!-- 搜索框 -->
    <search />
    <!-- 头像 -->
    <avatar class='ml-6' />
  </v-container>
</template>

<script>
import ButtonRouter from './ButtonRouter.vue'
import Search from './Search.vue'
import Avatar from './Avatar.vue'
export default {
  components: { ButtonRouter, Search, Avatar },
  data: () => ({})
}
</script>
