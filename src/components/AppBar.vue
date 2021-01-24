<template>
  <v-container class="d-flex align-center">
    <!-- 按键 -->
    <bt-link class="d-none d-sm-flex" />
    <!-- 布局调整 -->
    <v-spacer class="d-none d-sm-flex"></v-spacer>
    <!-- 搜索框 -->
    <search />
    <!-- 布局调整 -->
    <v-spacer class="d-sm-none"></v-spacer>
    <!-- 头像 -->
    <avatar />
  </v-container>
</template>

<script>
import Avatar from "./AppBar/Avatar.vue";
import Search from "./AppBar/Search.vue";
import BtLink from "./AppBar/BtLink.vue";
export default {
  components: {
    BtLink,
    Search,
    Avatar,
  },
  data: () => ({}),
};
</script>
