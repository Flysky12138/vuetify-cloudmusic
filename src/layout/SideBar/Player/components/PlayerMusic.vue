<template>
  <v-container>
    <v-row justify="center">
      <!-- 封面、歌曲名、歌手 -->
      <v-col cols="8" class="pb-0">
        <v-img
          :src="imgUrl"
          max-width="400"
          class="rounded-lg mx-auto"
          style="box-shadow: #80d8ff 0 0 5px"
        ></v-img>
        <div class="text-center font-weight-bold text-h5 text-truncate pt-3">
          歌曲标题歌曲标题歌曲标题歌曲标
        </div>
        <div class="text-center font-weight-bold text-subtitle-2 text-truncate">
          歌手歌手歌手歌手歌手歌手
        </div>
      </v-col>
      <!-- 按键 -->
      <v-col cols="9">
        <div
          class="d-flex justify-space-between align-center pt-3 mx-auto"
          style="max-width: 400px"
        >
          <!-- 左边 -->
          <div>
            <button-add :id="a" />
            <button-love :id="1" />
          </div>
          <!-- 中间 -->
          <div>
            <button-music />
          </div>
          <!-- 右边 -->
          <div>
            <button-sound />
            <button-playlist />
          </div>
        </div>
      </v-col>
      <!-- 进度条 -->
      <v-col cols="8">
        <v-slider v-model="c" min="0" max="196611" hide-details>
          <template v-slot:prepend>
            <span class="mt-1">{{ songTime(c) }}</span>
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
import time from "common/time";
import ButtonLove from "components/Button/ButtonLove.vue";
import ButtonAdd from "components/Button/ButtonAdd.vue";
import ButtonSound from "components/Button/ButtonSound.vue";
import ButtonPlaylist from "components/Button/ButtonPlaylist.vue";
import ButtonMusic from "components/Button/ButtonMusic.vue";
export default {
  components: {
    ButtonLove,
    ButtonAdd,
    ButtonSound,
    ButtonPlaylist,
    ButtonMusic,
  },
  data: () => ({
    imgUrl:
      "http://p1.music.126.net/4YSJcLtkBWGFXTRZNc0wTQ==/109951163892261723.jpg",
    a: 0,
    b: 196611,
    c: 0,
  }),
  methods: {
    songTime(params) {
      return time.song(params);
    },
  },
};
</script>
