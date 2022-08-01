<template>
  <footer>
    <audio
      :src="url"
      :autoplay="isplay"
      :loop="!mode"
      @timeupdate="timeUpdate"
      @ended="next"
      @error="httpError"
      crossorigin="anonymous"
      preload="auto"
      ref="audio"
    ></audio>
  </footer>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { apiStore } from '@/plugins/store/api'
import { mapState, mapActions } from 'pinia'
export default {
  data: () => ({
    url: '', // 歌曲地址
    settimeout: null,
    dtOffset: 0, // 歌曲播放的时间偏移量,因为部分歌曲(VIP,未登录)只会截取一段返回
    playTime: 0 // 记录单首歌曲的播放时间
  }),
  created() {
    this.$bus.$on('changeDt', time => {
      this.setDt(time)
    })
  },
  mounted() {
    this.$refs.audio.volume = this.volume / 10
  },
  watch: {
    // 获取播放信息
    music: 'getMusicDetail',
    // 播放、暂定
    isplay(newValue) {
      newValue ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    // 音量
    volume(newValue) {
      this.$refs.audio.volume = newValue / 10
    },
    // 静音
    muted(newValue) {
      this.$refs.audio.muted = newValue
    },
    // 查找当前时间对应歌词在数组中的索引值
    dt(newValue) {
      const index = [...this.lyric.data].findIndex(res => res.time > newValue)
      if (index === -1) {
        this.setlyricIndex(this.lyric.data.length - 1)
      } else if (index > 0) {
        this.setlyricIndex(index - 1)
      } else {
        this.setlyricIndex(0)
      }
    }
  },
  computed: {
    ...mapState(playerStore, ['music', 'isplay', 'volume', 'muted', 'dt', 'mode', 'lyric']),
    ...mapState(apiStore, ['api2'])
  },
  methods: {
    ...mapActions(playerStore, ['setPlayDt', 'previous', 'next', 'removeMusic', 'setlyricData', 'setlyricIndex']),
    // 播放音乐时约每250ms回调一次
    timeUpdate(res) {
      this.playDt(res)
      this.scrobble(res)
    },
    // 获取播放进度
    playDt(res) {
      this.setPlayDt((res.target.currentTime + this.dtOffset) * 1000)
    },
    // 调整播放进度
    setDt(res) {
      this.$refs.audio.currentTime = res / 1000
    },
    // 听歌打卡，播放时间大于歌曲时间的3/4才执行。
    scrobble(res) {
      if (this.playTime !== -1) {
        this.playTime += res.target.duration || 0
      }
      if (this.playTime > this.music.dt * 0.75) {
        this.playTime = -1
        this.$http.song.scrobble(this.music.id, this.music.albumID)
      }
    },
    // 获取播放歌曲歌词等信息
    async getMusicDetail() {
      // 暂停
      this.$refs.audio.pause()
      // 还原播放信息
      this.dtOffset = this.playTime = 0
      this.setDt(0)
      // 修改标题
      document.title = this.music.name + ' - ' + this.music.artists.map(res => res.name).join('/')
      // 获取歌词
      this.setlyricData([{ lyric: '歌词加载中' }])
      clearTimeout(this.settimeout)
      this.settimeout = setTimeout(async () => {
        this.setlyricData(await this.$http.song.lyric(this.music.id))
      }, 500)
      // 获取URL
      try {
        if ((this.music.privilege.st >= 0 && [0, 8].includes(this.music.privilege.fee)) || this.music.privilege.cs) {
          this.url = await this.$http.song.url(this.music.id).then(_res => _res.url)
        } else {
          if ((await fetch(this.api2 + '/test').then(_res => _res.statusText)) === 'OK') {
            this.url = this.api2 + '/?id=' + this.music.id
          }
        }
      } catch (error) {
        this.httpError()
      }
      // 播放
      this.$refs.audio.load()
    },
    // 加载歌曲错误
    httpError() {
      if (this.music.name) {
        if (this.music.privilege.fee === 1) {
          this.$http.song.url(this.music.id).then(res => {
            this.url = res.url
            res.freeTrialInfo && (this.dtOffset = res.freeTrialInfo.start)
          })
        } else {
          this.$message({ text: '〖 ' + this.music.name + ' 〗 暂无版权', timeout: 2000 })
          console.log('暂无版权:', this.music.name, '-', this.music.artists.map(res => res.name).join('/'), '; ID:', this.music.id)
          setTimeout(() => {
            const id = this.music.id
            this.next()
            this.removeMusic(id)
          }, 2500)
        }
      }
    }
  }
}
</script>
