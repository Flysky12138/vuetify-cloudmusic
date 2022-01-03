<template>
  <v-container>
    <v-row>
      <v-col cols='12' class='d-flex'>
        <v-col cols='auto'>
          <image-cover :src='info.picUrl' :size='180' />
        </v-col>
        <v-col class='text-subtitle-2'>
          <div class='d-flex align-center' style='flex-wrap: wrap'>
            <span>歌手：{{ info.artist.name }}</span>
            <span v-if='info.artist.alias.length > 0' class='ml-9'>艺名：{{ info.artist.alias.join("/") }}</span>
            <span class='ml-9'>发行时间：{{ publishTime }}</span>
            <span class='ml-9'>发行公司：{{ info.company }}</span>
          </div>
          <div v-if='info.description' class='pt-3'>
            <v-divider />
            <div style='white-space: pre-wrap' class='mt-3'>{{ '专辑介绍：' + info.description.trim() }}</div>
          </div>
        </v-col>
      </v-col>
      <v-col cols='12'>
        <song-list :title='info.name' :subtitle='songs.length' :value='songs' :loading='loading' :itemsPerPage='30'></song-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongList from 'components/Song/SongList.vue'
import ImageCover from 'components/Image/ImageCover.vue'
import time from 'common/time'
export default {
  components: { SongList, ImageCover },
  data: () => ({
    info: {
      artist: {
        name: '',
        alias: [],
        img1v1Url: ''
      },
      id: 0,
      name: '',
      picUrl: '',
      publishTime: 0,
      company: '',
      description: ''
    },
    songs: [],
    loading: false
  }),
  created() {
    this.getAlbumDetail(this.$route.query.id)
  },
  computed: {
    publishTime() {
      return time.date(this.info.publishTime).substring(0, 10)
    }
  },
  methods: {
    getAlbumDetail(id) {
      this.loading = true
      this.$http.album(id).then(res => {
        Object.assign(this.info, res.info)
        this.songs = res.songs
        this.loading = false
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getAlbumDetail(to.query.id)
    next()
  }
}
</script>
