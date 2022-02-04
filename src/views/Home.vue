<template>
  <v-container>
    <v-row>
      <!-- 左侧导航栏 -->
      <v-col cols='3'>
        <template v-if='loading.left'>
          <template v-for='i in 2'>
            <v-skeleton-loader type='heading' class='px-2 mt-4'></v-skeleton-loader>
            <v-skeleton-loader type='list-item-avatar-two-line' v-for='j in 2*i+2' :key='j.id' height='57' class='mx-n2'></v-skeleton-loader>
          </template>
        </template>
        <template v-else>
          <v-list class='pa-0' nav>
            <v-list-item-group :value='0' color='primary'>
              <template v-for='(items,index) in lists'>
                <v-subheader class='font-weight-bold'>{{ index === 'feature' ? '云音乐特色榜' : '全球媒体榜' }}</v-subheader>
                <v-list-item v-for='item in items' :key='item.id' @click='getSonglists(item.id)'>
                  <v-list-item-icon class='my-auto mr-3'>
                    <v-img :src='item.coverImgUrl' width='40' aspect-ratio='1'></v-img>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text='item.name' class='text-subtitle-2'></v-list-item-title>
                    <v-list-item-title v-text='item.updateFrequency' class='text-caption text--disabled'></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </template>
      </v-col>
      <v-divider vertical></v-divider>
      <!-- 右侧歌曲 -->
      <v-col>
        <my-router-transition>
          <template v-if='playlist.songs.length > 0'>
            <song-list :value='playlist.songs' :disColumn='[3]' :itemsPerPage='playlist.songs.length' :loading='loading.right'>
              <template #top>
                <p class='text-subtitle-2 my-0' style='text-indent:2em' v-text='playlist.detail.description'></p>
              </template>
            </song-list>
          </template>
          <template v-else>
            <v-sheet height='80vh' class='d-flex align-center justify-center'>
              <v-btn icon disabled absolute>
                <v-icon size='100'>mdi-cards-heart</v-icon>
              </v-btn>
            </v-sheet>
          </template>
        </my-router-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    SongList: () => import('@/components/Song/SongList.vue')
  },
  data: () => ({
    lists: {},
    playlist: {
      detail: {},
      songs: []
    },
    loading: {
      left: true,
      right: true
    }
  }),
  created() {
    this.$http.toplist().then(res => {
      this.lists = res
      this.getSonglists(res.feature[0].id)
      this.loading.left = false
    })
  },
  methods: {
    getSonglists(id) {
      this.$vuetify.goTo(0, {
        duration: 400,
        offset: 0,
        easing: 'easeOutQuad'
      })
      this.loading.right = true
      this.$http.playlist.detail(id).then(res => {
        this.$http.song.detail(res.trackIds).then(_res => {
          this.playlist.detail = res
          this.playlist.songs = _res
          this.loading.right = false
        })
      })
    }
  }
}
</script>

