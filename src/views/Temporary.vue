<template>
  <v-container>
    <song-list title='暂存于浏览器中的无版权歌曲' :value='value' :loading='loading'>
      <template #item.btn.one='{ id, name, privilege }'>
        <button-delete :name='name' @click='delSong(id)' v-if='privilege.st < 0 && !privilege.cs' />
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
    value: [],
    ids: [],
    loading: false
  }),
  activated() {
    this.ids = localStorage.getItem('ids') ? localStorage.getItem('ids').split(',') : []
    this.getSong()
  },
  methods: {
    getSong() {
      this.loading = true
      this.$http.song.detail(this.ids).then(res => {
        this.value = res
        this.loading = false
      })
    },
    // 删除歌曲
    delSong(id) {
      this.value.splice(
        this.value.findIndex(res => res.id === id),
        1
      )
      localStorage.setItem('ids', this.value.map(res => res.id).join(','))
    }
  }
}
</script>
