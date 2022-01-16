<template>
  <v-container>
    <song-list title='网易云音乐云盘' :value='songlist' :loading='loading'>
      <v-file-input style='transform: translate(15px,3px)' prepend-icon='mdi-cloud-upload' hide-input multiple accept='audio/*' @change='upload'></v-file-input>
      <template #item.btn.one='{ id, name }'>
        <button-delete :name='name' @click='delSong(id)' />
      </template>
    </song-list>
  </v-container>
</template>

<script>
import SongList from 'components/Song/SongList.vue'
import ButtonDelete from 'components/Button/ButtonDelete.vue'
export default {
  components: { SongList, ButtonDelete },
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
    },
    // 从云盘删除歌曲
    delSong(id) {
      this.$http.cloud.del(id).then(res => {
        if (res) {
          this.songlist.splice(
            this.songlist.findIndex(res => res.id === id),
            1
          )
        }
      })
    }
  }
}
</script>
