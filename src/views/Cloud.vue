<template>
  <v-container>
    <song-list title='网易云音乐云盘' :value='songlist' :loading='loading' :itemsPerPage='30' :own='true' :cloud='true'>
      <v-file-input style='transform: translateY(3px)' prepend-icon='mdi-upload' hide-input multiple accept='audio/*' @change='upload'></v-file-input>
    </song-list>
  </v-container>
</template>

<script>
import SongList from 'components/Song/SongList.vue'
export default {
  components: { SongList },
  data: () => ({
    songlist: [],
    loading: false
  }),
  created() {
    this.getData()
  },
  methods: {
    // 上传歌曲
    upload(file) {
      this.$http.cloud.upload(file).then(res => {
        this.getData()
      })
    },
    // 获取云盘歌曲
    getData() {
      this.loading = true
      this.$http.cloud.detail().then(res => {
        this.songlist = res
        this.loading = false
      })
    }
  }
}
</script>
