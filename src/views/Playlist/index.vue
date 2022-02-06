<template>
  <v-container>
    <!-- 获取数据前骨架图 -->
    <skeleton-loader v-if='skeleton' />
    <v-row v-else>
      <v-col cols='12'>
        <playlist-detail :value='playlistDetail' />
      </v-col>
      <v-col cols='12'>
        <song-list :title='playlistDetail.name' :value='songlistDetail.songlist' :loading='songlistDetail.loading'>
          <template #item.btn.one='{ id, name }' v-if='playlistDetail.userId === uid'>
            <button-delete :name='name' @click='delSong(id)' />
          </template>
        </song-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { userStore } from '@/plugins/store/user'
import { mapState } from 'pinia'
import SkeletonLoader from './components/SkeletonLoader.vue'
import PlaylistDetail from './components/PlaylistDetail.vue'
import SongList from '@/components/Song/SongList'
import ButtonDelete from '@/components/Button/ButtonDelete.vue'
export default {
  components: { SkeletonLoader, PlaylistDetail, SongList, ButtonDelete },
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
    ...mapState(userStore, {
      uid: state => state.info.uid
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
    },
    // 从歌单删除歌曲
    delSong(id) {
      this.$http.playlist.tracks(this.$route.query.id, id, false).then(res => {
        if (res.body.code == 200) {
          this.songlistDetail.songlist.splice(
            this.songlistDetail.songlist.findIndex(res => res.id === id),
            1
          )
        }
      })
    }
  }
}
</script>
