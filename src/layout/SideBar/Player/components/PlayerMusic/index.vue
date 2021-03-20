<template>
  <v-container>
    <v-row justify="center">
      <!-- 封面、歌曲名、歌手 -->
      <v-col cols="8" class="pb-0">
        <v-img
          :src="value.picUrl"
          min-height="300"
          max-width="400"
          class="rounded-lg mx-auto"
        ></v-img>
        <div
          class="text-center font-weight-bold text-h5 text-truncate pt-3"
          v-text="value.name"
        ></div>
        <div
          class="text-center font-weight-bold text-subtitle-2 text-truncate"
          v-text="value.artists"
        ></div>
      </v-col>
      <!-- 按键 -->
      <v-col cols="9">
        <div
          class="d-flex justify-space-between align-center pt-3 mx-auto"
          style="max-width: 400px"
        >
          <!-- 左边 -->
          <div>
            <button-add :id="value.id" />
            <button-love :id="value.id" />
          </div>
          <!-- 中间 -->
          <div>
            <player-music-play />
          </div>
          <!-- 右边 -->
          <div>
            <player-music-sound />
            <player-music-lists />
          </div>
        </div>
      </v-col>
      <!-- 进度条 -->
      <v-col cols="8">
        <v-slider
          v-model="dt"
          min="0"
          :max="value.duration"
          hide-details
          color="purple darken-3"
          track-color="purple lighten-3"
          @mousedown="canSetDt = true"
          @mouseup="
            canSetDt = false;
            $emit('changeDt', dt);
          "
        >
          <template v-slot:prepend>
            <span class="mt-1">{{ songTime(dt) }}</span>
          </template>
          <template v-slot:append>
            <span class="mt-1">{{ songTime(value.duration) }}</span>
          </template>
        </v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import time from "common/time";
import ButtonAdd from "components/Button/ButtonAdd.vue";
import ButtonLove from "components/Button/ButtonLove.vue";
import PlayerMusicPlay from "./PlayerMusicPlay.vue";
import PlayerMusicSound from "./PlayerMusicSound.vue";
import PlayerMusicLists from "./PlayerMusicLists.vue";
export default {
  components: {
    ButtonAdd,
    ButtonLove,
    PlayerMusicPlay,
    PlayerMusicSound,
    PlayerMusicLists,
  },
  props: {
    value: { type: Object, required: true },
  },
  data: () => ({
    dt: 0, // 播放进度
    canSetDt: false, // 鼠标是否正在滑动滑动条
  }),
  watch: {
    // 手动滑动时不赋值
    playDt(newValue) {
      !this.canSetDt && (this.dt = newValue);
    },
  },
  computed: {
    ...mapState({
      playDt: (state) => state.play.music.dt, // 当前播放音乐进度
    }),
  },
  methods: {
    songTime(params) {
      return time.song(params);
    },
  },
};
</script>
