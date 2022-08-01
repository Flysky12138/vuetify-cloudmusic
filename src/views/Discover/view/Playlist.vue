<template>
  <v-container class="pa-0" id="playlistHead">
    <!-- 歌单刷新前的骨架图 -->
    <v-row justify="space-around" v-if="loading">
      <v-col :key="item" class="px-6" cols="auto" v-for="item in params.limit">
        <v-skeleton-loader class="mb-12" height="120" type="image" width="120"></v-skeleton-loader>
      </v-col>
    </v-row>
    <!-- 歌单 -->
    <v-row justify="space-around" v-else>
      <v-col :key="index" cols="auto" v-for="(item, index) in playlists">
        <song-card :value="item" />
      </v-col>
    </v-row>
    <!-- 分页 -->
    <v-pagination
      :length="Math.ceil(total / params.limit)"
      :total-visible="13"
      :value="Number($route.query.page)"
      @input="clickChangePage"
      circle
      class="pt-6 pb-3"
      v-if="total > params.limit"
    ></v-pagination>
  </v-container>
</template>

<script>
import SongCard from '@/components/Song/SongCard.vue'
export default {
  components: { SongCard },
  data: () => ({
    playlists: [], // 显示的歌单列表
    total: 0, // 歌单总数
    // 歌单请求参数
    params: {
      cat: '全部',
      limit: 24,
      offset: 0,
      order: 'hot'
    },
    loading: true
  }),
  created() {
    Object.assign(this.params, {
      cat: this.$route.query.cat,
      offset: (this.$route.query.page - 1) * this.params.limit
    })
    // 获取歌单列表
    this.$http.playlist.top(this.params).then(res => {
      this.playlists = res.playlists
      this.total = res.total
      this.loading = false
    })
  },
  methods: {
    // 点击分页组件换页
    clickChangePage(page) {
      // 滚动到歌单顶部
      this.$vuetify.goTo('#playlistHead', {
        duration: 300, // 动画时长
        offset: 70 // 偏移
      })
      // 改变路由
      setTimeout(() => {
        this.$router.push(`${this.$route.path}?cat=${this.params.cat}&page=${page}`)
      }, 400)
    }
  }
}
</script>
