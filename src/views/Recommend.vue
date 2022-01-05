<template>
  <v-container>
    <song-list :title='`${$time.nowDate()} 日推歌曲列表`' :subtitle='subtitle' :value='value' :loading='loading' :itemsPerPage='itemsPerPage' />
  </v-container>
</template>

<script>
import SongList from 'components/Song/SongList.vue'
export default {
  components: { SongList },
  data: () => ({
    subtitle: 0,
    value: [],
    itemsPerPage: 1,
    loading: false
  }),
  created() {
    this.loading = true
    this.$http.playlist.recommend().then(res => {
      this.subtitle = res.length
      this.value = res
      this.itemsPerPage = res.length
      this.loading = false
    })
  }
}
</script>

