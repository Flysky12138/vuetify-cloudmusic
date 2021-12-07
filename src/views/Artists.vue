<template>
  <v-container>
    <v-row class='pa-3'>
      <v-col cols='auto'>
        <image-cover :src='value.img1v1Url' :size='180' />
      </v-col>
      <v-col class='text-subtitle-2'>
        <div class='d-flex align-center'>
          <image-avatar :uid='value.accountId' :src='value.img1v1Url' />
          <span class='ml-5'>化名：{{ value.alias.join("/") }}</span>
          <span class='ml-9'>歌曲：{{ value.musicSize }}</span>
          <span class='ml-9'>专辑：{{ value.albumSize }}</span>
          <span class='ml-9'>视频：{{ value.mvSize }}</span>
        </div>
        <div style='white-space: pre-wrap' class='mt-3'>{{ value.briefDesc.replaceAll('\n','\n\n').trim() }}</div>
      </v-col>
    </v-row>
    <song-list :title='value.name' :subtitle='`热门歌曲 ${value.hotSongs.length} 首`' :value='value.hotSongs' :loading='loading' :itemsPerPage='10' ref='songlist' />
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
      hotSongs: [],
      name: '',
      img1v1Url: ''
    },
    loading: false
  }),
  created() {
    this.getData(this.$route.query.id)
  },
  methods: {
    getData(id) {
      this.loading = true
      this.$http.artists(id).then(res => {
        Object.assign(this.value, res)
        this.loading = false
        // 更换搜索内容跳转到第一页
        this.$refs.songlist.page = 1
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getData(to.query.id)
    next()
  }
}
</script>
