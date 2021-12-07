<template>
  <v-container>
    <v-row justify='center'>
      <!-- 封面、歌曲名、歌手 -->
      <v-col cols='8' class='pb-0'>
        <v-img :src='music.picUrl' width='80%' aspect-ratio='1' class='rounded-lg mx-auto'></v-img>
        <div class='text-center font-weight-bold text-h5 text-truncate pt-3' v-text='music.name'></div>
        <div class='text-center font-weight-bold text-subtitle-2 text-truncate' v-text='music.artists.map(res=>res.name).join(" / ")'></div>
      </v-col>
      <!-- 按键 -->
      <v-col cols='8'>
        <div class='d-flex justify-space-between align-center pt-3 mx-auto' style='max-width: 80%; min-width: 300px'>
          <!-- 左边 -->
          <div>
            <button-add :id='music.id' nolove />
            <button-love :id='music.id' />
          </div>
          <!-- 中间 -->
          <div>
            <player-music-play />
          </div>
          <!-- 右边 -->
          <div>
            <player-music-sound />
            <player-music-mode />
          </div>
        </div>
      </v-col>
      <!-- 进度条 -->
      <v-col cols='8'>
        <v-slider
          v-model='dt'
          min='0'
          :max='music.dt'
          hide-details
          color='purple darken-3'
          track-color='purple lighten-3'
          @mousedown='canSetDt = false'
          @mouseup='
            canSetDt = true;
            $emit("changeDt", dt);
          '
        >
          <template v-slot:prepend>
            <span class='mt-1'>{{ songTime(dt) }}</span>
          </template>
          <template v-slot:append>
            <span class='mt-1'>{{ songTime(music.dt) }}</span>
          </template>
        </v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import time from 'common/time'
import ButtonAdd from 'components/Button/ButtonAdd.vue'
import ButtonLove from 'components/Button/ButtonLove.vue'
import PlayerMusicPlay from './PlayerMusicPlay.vue'
import PlayerMusicSound from './PlayerMusicSound.vue'
import PlayerMusicMode from './PlayerMusicMode.vue'
export default {
  components: {
    ButtonAdd,
    ButtonLove,
    PlayerMusicPlay,
    PlayerMusicSound,
    PlayerMusicMode
  },
  data: () => ({
    dt: 0, // 播放进度
    canSetDt: true // 鼠标是否正在滑动滑动条
  }),
  watch: {
    // 手动滑动时不赋值
    playDt(newValue) {
      this.canSetDt && (this.dt = newValue)
    }
  },
  computed: {
    ...mapState({
      music: state => state.play.music, // 正在播放的歌曲信息
      playDt: state => state.play.dt // 当前播放音乐进度
    })
  },
  methods: {
    songTime(params) {
      return time.song(params)
    }
  }
}
</script>
