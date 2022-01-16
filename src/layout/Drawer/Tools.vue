<template>
  <v-list dense nav>
    <v-subheader v-text='name'></v-subheader>
    <v-list-item v-for='(item,index) in items' :key='item.id' link @click='onClick(index)'>
      <v-list-item-icon>
        <v-icon color='purple lighten-3' v-text='item.icon'></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text='item.name'></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
import download from 'common/download'
export default {
  data: () => ({
    name: '功能',
    items: [{ name: '歌曲下载', icon: 'mdi-download' }]
  }),
  computed: {
    ...mapState({
      music: state => state.play.music
    })
  },
  methods: {
    onClick(index) {
      switch (index) {
        case 0:
          this.songDownload()
          break
      }
    },
    // 下载正在播放的歌曲
    songDownload() {
      if (Object.keys(this.music).length) {
        this.$http.song.download(this.music.id).then(res => {
          download(res || document.querySelector('audio').src, `${this.music.name} - ${this.music.artists.map(_res => _res.name).join('/')}.mp3`)
        })
      }
    }
  }
}
</script>
