<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="7">
        <!-- 封面 -->
        <v-img
          :src="imgUrl"
          class="rounded-lg"
          style="box-shadow: #80d8ff 0 0 5px"
        ></v-img>
        <!-- 歌曲名 -->
        <div class="text-center font-weight-bold text-h5 text-truncate pt-3">
          歌曲标题歌曲标题歌曲标题歌曲标
        </div>
        <!-- 歌手 -->
        <div class="text-center font-weight-bold text-subtitle-2 text-truncate">
          歌手歌手歌手歌手歌手歌手
        </div>
        <!-- 按键 -->
        <div class="text-center pt-3">
          <button-add />
          <button-love class="mx-6" />
          <v-btn icon>
            <v-icon>mdi-volume-high</v-icon>
          </v-btn>
        </div>
      </v-col>
      <!-- 进度条 -->
      <v-col cols="8" class="text-center">
        <v-slider :min="0" :max="196611" thumb-label hide-details>
          <template v-slot:thumb-label="{ value }">
            {{ songTime(value) }}
          </template>
          <template v-slot:prepend>
            <span class="mt-1">{{ songTime(a) }}</span>
          </template>

          <template v-slot:append>
            <span class="mt-1">{{ songTime(b) }}</span>
          </template>
        </v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ButtonLove from "components/Button/ButtonLove.vue";
import ButtonAdd from "components/Button/ButtonAdd.vue";
import time from "common/time";
export default {
  components: { ButtonLove, ButtonAdd },
  data: () => ({
    imgUrl:
      "http://p1.music.126.net/4YSJcLtkBWGFXTRZNc0wTQ==/109951163892261723.jpg",
    a: 0,
    b: 196611,
  }),
  methods: {
    songTime(params) {
      return time.song(params);
    },
  },
};
</script>
