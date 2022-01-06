<template>
  <v-container>
    <!-- 获取数据前骨架图 -->
    <skeleton-loader v-if='skeleton' />
    <v-row v-else>
      <v-col cols='12'>
        <playlist-detail :value='playlistDetail' />
      </v-col>
      <v-col cols='12'>
        <song-list
          :title='playlistDetail.name'
          :value='songlistDetail.songlist'
          :loading='songlistDetail.loading'
          :own='playlistDetail.userId === uid'
          :itemsPerPage='30'
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
    skeleton: true,
    playlistDetail: {},
    songlistDetail: {
      songlist: [],
      loading: false
    }
  }),
  activated() {
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
        this.getSongs(res.trackIds)
        this.skeleton = false
      })
    },
    // 获取歌单歌曲列表
    getSongs(ids) {
      this.songlistDetail.loading = true
      this.$http.song.detail(ids).then(res => {
        this.songlistDetail.songlist = res
        this.songlistDetail.loading = false
      })
    }
  }
}
</script>
