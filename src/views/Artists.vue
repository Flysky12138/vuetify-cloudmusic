<template>
  <v-container>
    <v-row class='pa-3'>
      <v-col cols='auto'>
        <image-cover :src='value.img1v1Url' :size='180' />
      </v-col>
      <v-col class='text-subtitle-2'>
        <div class='d-flex align-center'>
          <image-avatar :uid='value.accountId' :src='value.img1v1Url' />
          <span v-if='value.alias.length > 0' class='ml-5'>艺名：{{ value.alias.join("/") }}</span>
          <span class='ml-9'>歌曲：{{ value.musicSize }}</span>
          <span class='ml-9'>专辑：{{ value.albumSize }}</span>
          <span class='ml-9'>视频：{{ value.mvSize }}</span>
        </div>
        <div style='white-space: pre-wrap' class='mt-3'>{{ value.briefDesc.replace(/(\r?\n)+/g,'\n\n').trim() }}</div>
      </v-col>
    </v-row>
    <song-list :title='value.name' :subtitle='`全部歌曲 ${songs.length} 首`' :value='songs' :loading='loading' :itemsPerPage='10' ref='songlist' />
  </v-container>
</template>

<script>
import SongList from 'components/Song/SongList.vue'
import ImageCover from 'components/Image/ImageCover.vue'
import ImageAvatar from 'components/Image/ImageAvatar.vue'
export default {
  components: { SongList, ImageCover, ImageAvatar },
  data: () => ({
    value: {
      accountId: 0,
      alias: [],
      musicSize: '',
      albumSize: '',
      mvSize: '',
      briefDesc: '',
      name: '',
      img1v1Url: ''
    },
    songs: [],
    loading: false
  }),
  created() {
    this.getDetail(this.$route.query.id)
    this.getSongs(this.$route.query.id)
  },
  methods: {
    getDetail(id) {
      this.$http.artist.detail(id).then(res => {
        Object.assign(this.value, res)
      })
    },
    getSongs(id) {
      this.loading = true
      this.$http.artist.songs(id).then(res => {
        this.songs = res
        this.loading = false
        this.$refs.songlist.page = 1 // 更换搜索内容跳转到第一页
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.songs = []
    this.getDetail(to.query.id)
    this.getSongs(to.query.id)
    next()
  }
}
</script>
