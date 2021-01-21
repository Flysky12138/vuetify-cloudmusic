<template>
  <v-container class="py-0 fill-height">
    <v-row class="mr-3">
      <!-- 按键 -->
      <v-btn
        v-for="link in links"
        :key="link.id"
        text
        class="mx-3 text-subtitle-1 font-weight-bold"
        style="width: 80px"
      >
        {{ link }}
      </v-btn>
      <!-- 布局占位 -->
      <v-spacer></v-spacer>
      <!-- 搜索框 -->
      <v-responsive max-width="260" class="mr-6">
        <v-text-field
          dense
          flat
          solo
          hide-details
          rounded
          clearable
          label="搜索"
          background-color="grey lighten-2"
        ></v-text-field>
      </v-responsive>
      <!-- 头像 -->
      <v-avatar color="grey lighten-2" size="38"></v-avatar>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      links: ["首页", "日推", "电台", "关于"],
    };
  },
};
</script>
