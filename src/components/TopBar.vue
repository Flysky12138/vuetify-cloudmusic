<template>
  <v-container class="d-flex align-center">
    <!-- 按键 -->
    <tools />
    <!-- 搜索框 -->
    <search />
    <!-- 头像 -->
    <avatar class="ml-6" />
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
