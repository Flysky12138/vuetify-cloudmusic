<template>
  <v-container>
    <!-- 获取数据前骨架图 -->
    <skeleton-loader v-if='skeleton' />
    <v-row v-else>
      <v-col cols='12' class='d-flex'>
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
          <introduce :value='value.briefDesc' />
        </v-col>
      </v-col>
      <v-col cols='12'>
        <song-list :title='value.name' :value='songs' :loading='loading' ref='songlist' />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongList from 'components/Song/SongList.vue'
import ImageCover from 'components/Image/ImageCover.vue'
import ImageAvatar from 'components/Image/ImageAvatar.vue'
import SkeletonLoader from './Playlist/components/SkeletonLoader.vue'
import Introduce from 'components/Introduce.vue'
export default {
  components: { SongList, ImageCover, ImageAvatar, SkeletonLoader, Introduce },
  data: () => ({
    skeleton: true,
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
    total: 0,
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
        this.skeleton = false
      })
    },
    getSongs(id) {
      this.loading = true
      this.$http.artist.songs(id).then(res => {
        this.songs = res
        this.loading = false
        // 更换搜索内容跳转到第一页
        if (this.$refs.songlist.pageCount > 1) {
          this.$refs.songlist.page = 1
        }
      })
    }
  }
}
</script>
