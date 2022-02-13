<template>
  <v-container class='pa-0' id='playlistHead'>
    <!-- 歌单刷新前的骨架图 -->
    <v-row v-if='loading' justify='space-around'>
      <v-col cols='auto' v-for='item in 30' :key='item' class='px-6'>
        <v-skeleton-loader class='mb-12' width='120' height='120' type='image'></v-skeleton-loader>
      </v-col>
    </v-row>
    <!-- 歌单 -->
    <v-row v-else justify='space-around'>
      <v-col cols='auto' v-for='(item, index) in playlists' :key='index'>
        <song-card :value='item' />
      </v-col>
    </v-row>
    <!-- 分页 -->
    <v-pagination
      class='pt-6 pb-3'
      v-if='total > params.limit'
      :value='Number($route.query.page)'
      :length='Math.ceil(total / params.limit)'
      :total-visible='13'
      circle
      @input='clickChangePage'
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
      limit: 30,
      offset: 0,
      order: 'hot'
    },
    loading: true
  }),
  created() {
    /**
     * 该组件用在嵌套的 <router-view/> 中，路由 /discover/playlist
     * 第一层App.vue中使用固定key值，第二层./index.vue中每个界面使用单独key值
     * 实现 /discover 路由下整体缓存，但该组件单独缓存
     * 这里存在未知BUG：首次进入其他路由都会执行这里
     */
    if (this.$route.path === '/discover/playlist') {
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
    }
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
