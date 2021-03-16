<template>
  <v-container>
    <v-row justify="center">
      <!-- 封面 -->
      <v-col cols="7">
        <v-img
          :src="imgUrl"
          class="rounded-lg"
          style="box-shadow: #80d8ff 0 0 5px"
        ></v-img>
      </v-col>
      <!-- 标签 -->
      <v-col cols="12" class="text-center">
        <div class="font-weight-bold text-h5">歌曲标题</div>
        <div class="font-weight-bold">歌手</div>
      </v-col>
      <!-- 按键 -->
      <v-col cols="12">
        <div>按键</div>
      </v-col>
      <!-- 进度条 -->
      <v-col cols="12">
        <div>进度条</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    imgUrl:
      "http://p1.music.126.net/4YSJcLtkBWGFXTRZNc0wTQ==/109951163892261723.jpg",
  }),
};
</script>
