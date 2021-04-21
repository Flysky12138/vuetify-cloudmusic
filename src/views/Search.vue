<template>
  <v-container>
    <song-list :title='keywords' :subtitle='songCount' :value='songs' :loading='loading' :itemsPerPage='itemsPerPage' @pageEnd='getMoreSongs' ref='songlist' />
  </v-container>
</template>

<script>
import SongList from 'components/Song/SongList.vue'
export default {
  components: { SongList },
  data: () => ({
    keywords: '',
    songCount: 0,
    songs: [],
    itemsPerPage: 9,
    hasMore: false,
    loading: false
  }),
  created() {
    this.keywords = this.$route.query.keywords
    this.itemsPerPage = Math.floor((this.$vuetify.breakpoint.height - 280) / 50) // 单页显示数
    this.searchSongs()
  },
  methods: {
    // 获取歌曲列表
    searchSongs(offset = 0) {
      this.loading = true
      this.$http.song.search(this.keywords, offset, this.itemsPerPage * 4).then(res => {
        this.songs = this.songs.concat(res.songs)
        this.songCount = res.songCount
        this.hasMore = res.hasMore
        this.loading = false
      })
    },
    // 获取更多歌曲列表
    getMoreSongs(page) {
      if (this.hasMore) {
        this.searchSongs(page * this.itemsPerPage)
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.keywords = to.query.keywords
    this.songs = []
    // 更换搜索内容跳转到第一页
    this.$refs.songlist.page = 1
    this.searchSongs()
    next()
  }
}
</script>

