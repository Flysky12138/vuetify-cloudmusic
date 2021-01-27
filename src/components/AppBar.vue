<template>
  <v-container class="d-flex align-center">
    <!-- 按键 -->
    <tools />
    <!-- 布局调整 -->
    <v-spacer></v-spacer>
    <!-- 搜索框 -->
    <search class="mr-6" />
    <!-- 头像 -->
    <avatar />
  </v-container>
</template>

<script>
import Avatar from "./AppBar/Avatar.vue";
import Search from "./AppBar/Search.vue";
import Tools from "./AppBar/Tools.vue";
export default {
  components: { Avatar, Search, Tools },
  data: () => ({}),
};
</script>
