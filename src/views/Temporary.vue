<template>
  <v-container>
    <song-list title='暂存于浏览器中的无版权歌曲' :value='value' :loading='loading'>
      <template #item.btn.before='{ id, name }'>
        <button-delete :name='name' @click='delSong(id)' />
      </template>
      <template #item.btn.one='{ privilege }'>
        <div v-if='privilege.st < 0 && !privilege.cs'></div>
      </template>
    </song-list>
  </v-container>
</template>

<script>
export default {
  components: {
    SongList: () => import('@/components/Song/SongList.vue'),
    ButtonDelete: () => import('@/components/Button/ButtonDelete.vue')
  },
  data: () => ({
    value: [],
    ids: [],
    loading: false
  }),
  activated() {
    this.ids = JSON.parse(localStorage.getItem('ids')) || []
    this.getSong(this.ids)
  },
  methods: {
    getSong(ids) {
      this.loading = true
      this.$http.song.detail(ids).then(res => {
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
      localStorage.setItem('ids', JSON.stringify(this.value.map(res => res.id)))
    }
  }
}
</script>
