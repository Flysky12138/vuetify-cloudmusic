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
import Tools from "./TopBar/Tools.vue";
import Search from "./TopBar/Search.vue";
import Avatar from "./TopBar/Avatar.vue";
export default {
  components: { Tools, Search, Avatar },
  data: () => ({}),
};
</script>
