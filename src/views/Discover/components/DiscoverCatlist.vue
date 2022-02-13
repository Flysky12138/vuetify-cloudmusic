<template>
  <v-container>
    <v-expand-transition>
      <v-sheet v-show='isShow' class='px-2'>
        <v-row v-for='item in value' :key='item.id' class='ma-n3'>
          <v-col cols='auto'>
            <span class='ml-1 font-weight-bold text-subtitle-2' v-text='item.sort'></span>
          </v-col>
          <v-col cols='11' class='d-flex align-center flex-wrap'>
            <song-chip v-for='name in item.names' :key='item.id' :value='name' class='mr-2 mb-2' />
          </v-col>
        </v-row>
        <v-divider class='mt-3 mb-5'></v-divider>
      </v-sheet>
    </v-expand-transition>
    <v-row class='px-3' align='center'>
      <v-col>
        <span class='text-h6 font-weight-bold'>{{ $route.query.cat || '全部' }}</span>
      </v-col>
      <v-col cols='auto' class='pa-0 mx-auto'>
        <v-btn color='primary' icon @click='btnEvent' :disabled='value.length === 0'>
          <v-icon>{{ isShow ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-col>
      <v-col class='text-end'>
        <span class='text-subtitle-2 text--secondary font-weight-bold'>热门</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongChip from '@/components/Song/SongChip.vue'
export default {
  components: { SongChip },
  data: () => ({
    isShow: false,
    value: []
  }),
  created() {
    this.$http.playlist.catlist().then(res => {
      this.value = res
    })
  },
  methods: {
    btnEvent() {
      // 滚动到页面顶部
      if (this.isShow) {
        this.$vuetify.goTo(0, {
          duration: 500, // 动画时长
          offset: 0, // 偏移
          easing: 'easeOutQuad' // 动画
        })
      }
      this.isShow = !this.isShow
    }
  }
}
</script>
