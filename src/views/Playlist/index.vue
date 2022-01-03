<template>
  <v-container>
    <!-- 获取数据前骨架图 -->
    <skeleton-loader v-if='count != 1' />
    <v-row v-else>
      <v-col cols='12'>
        <playlist-detail :value='playlistDetail' />
      </v-col>
      <v-col cols='12'>
        <song-list
          :title='playlistDetail.name'
          :subtitle='songlistDetail.songlist.length'
          :value='songlistDetail.songlist'
          :loading='songlistDetail.loading'
          :itemsPerPage='30'
          :own='playlistDetail.userId === uid'
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SkeletonLoader from './components/SkeletonLoader.vue'
import PlaylistDetail from './components/PlaylistDetail.vue'
import SongList from 'components/Song/SongList'
export default {
  components: { SkeletonLoader, PlaylistDetail, SongList },
  data: () => ({
    count: 0,
    playlistDetail: {},
    songlistDetail: {
      songlist: [],
      loading: false
    }
  }),
  created() {
    this.getPlaylistDetail(this.$route.query.id)
  },
  computed: {
    ...mapState({
      uid: state => state.user.uid
    })
  },
  methods: {
    // 获取歌单信息
    getPlaylistDetail(id) {
      this.$http.playlist.detail(id).then(res => {
        Object.assign(this.playlistDetail, res)
        this.getSonglistDetail(res.trackIds)
        this.count++
      })
    },
    // 获取歌单歌曲列表
    getSonglistDetail(idsArr) {
      this.songlistDetail.loading = true
      this.$http.song.detail(idsArr).then(res => {
        this.songlistDetail.songlist = res
        this.songlistDetail.loading = false
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.count = 0
    this.getPlaylistDetail(to.query.id)
    next()
  }
}
</script>
