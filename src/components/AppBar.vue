<template>
  <v-container d-flex>
    <!-- 按键 -->
    <v-btn
      v-for="link in links"
      :key="link.id"
      text
      rounded
      class="mr-6 text-subtitle-1 font-weight-bold d-none d-sm-flex"
      width="80"
    >
      {{ link }}
    </v-btn>
    <!-- 布局调整 -->
    <v-spacer class="d-none d-sm-flex"></v-spacer>
    <!-- 搜索框 -->
    <v-sheet max-width="260" class="mr-6">
      <v-text-field
        solo
        dense
        rounded
        hide-details
        placeholder="search"
        background-color="grey lighten-2"
        :flat="!focus"
        @focus="focus = true"
        @blur="focus = false"
      ></v-text-field>
    </v-sheet>
    <!-- 布局调整 -->
    <v-spacer class="d-sm-none"></v-spacer>
    <!-- 头像 -->
    <v-avatar color="grey lighten-2" size="38">
      <v-icon>mdi-biohazard</v-icon>
    </v-avatar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    focus: false,
    links: ["首页", "歌单", "个性", "关于"],
  }),
};
</script>
