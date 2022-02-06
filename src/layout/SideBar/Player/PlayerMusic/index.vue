<template>
  <v-container>
    <v-row justify='center' style='min-width: 600px'>
      <!-- 封面、歌曲名、歌手 -->
      <v-col cols='8' class='py-0'>
        <v-img :src='music.picUrl' width='80%' aspect-ratio='1' class='rounded-lg mx-auto'></v-img>
        <div class='text-center font-weight-bold text-h5 text-truncate pt-3' v-text='music.name'></div>
        <div class='text-center font-weight-bold text-subtitle-2 text-truncate' v-text='music.artists.map(res=>res.name).join(" / ")'></div>
      </v-col>
      <!-- 按键 -->
      <v-col cols='8'>
        <v-row justify='space-around' align='center' no-gutters style='width: 88%' class='mx-auto'>
          <!-- 左边 -->
          <v-col cols='auto'>
            <button-add :id='music.id' nolove />
            <button-love :id='music.id' />
          </v-col>
          <!-- 中间 -->
          <v-col cols='auto'>
            <player-music-play />
          </v-col>
          <!-- 右边 -->
          <v-col cols='auto'>
            <player-music-sound />
            <player-music-mode />
          </v-col>
        </v-row>
      </v-col>
      <!-- 进度条 -->
      <v-col cols='8'>
        <v-slider
          v-model='playDt'
          min='0'
          :max='music.dt'
          hide-details
          color='purple darken-3'
          track-color='purple lighten-3'
          @mousedown='canSetDt = false'
          @mouseup='$emit("changeDt", playDt);canSetDt = true'
        >
          <template v-slot:prepend>
            <span class='mt-1' v-text='$time.song(playDt)'></span>
          </template>
          <template v-slot:append>
            <span class='mt-1' v-text='$time.song(music.playDt)'></span>
          </template>
        </v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState } from 'pinia'
import ButtonAdd from '@/components/Button/ButtonAdd.vue'
import ButtonLove from '@/components/Button/ButtonLove.vue'
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
    playDt: 0, // 播放进度
    canSetDt: true // 鼠标是否正在滑动滑动条
  }),
  watch: {
    // 手动滑动时不赋值
    dt(newValue) {
      this.canSetDt && (this.playDt = newValue)
    }
  },
  computed: {
    ...mapState(playerStore, ['music', 'dt'])
  }
}
</script>
