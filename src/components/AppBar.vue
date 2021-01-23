<template>
  <v-container>
    <v-row>
      <!-- 按键 -->
      <v-col cols="12" sm="6">
        <v-btn
          v-for="link in links"
          :key="link.id"
          text
          rounded
          class="mx-3 text-subtitle-1 font-weight-bold"
          style="width: 80px"
        >
          {{ link }}
        </v-btn>
      </v-col>
      <!-- 布局占位 -->
      <v-spacer></v-spacer>
      <!-- 搜索框 -->
      <v-col cols="12" sm="3">
        <v-text-field
          solo
          dense
          :flat="!focus"
          rounded
          hide-details
          placeholder="search"
          height="38"
          background-color="grey lighten-2"
          @focus="focus = true"
          @blur="focus = false"
        ></v-text-field>
      </v-col>
      <!-- 头像 -->
      <v-col cols="12" sm="1">
        <v-avatar color="grey lighten-2" size="38">
          <v-icon>mdi-biohazard</v-icon>
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      focus: false,
      links: ["首页", "歌单", "个性", "关于"],
    };
  },
};
</script>
