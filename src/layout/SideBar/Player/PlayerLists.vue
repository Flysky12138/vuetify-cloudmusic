<template>
  <v-menu v-if='lists.length > 1' v-model='dialog' :close-on-content-click='false' transition='slide-x-transition' dark>
    <!-- 按键 -->
    <template v-slot:activator='{ on, attrs }'>
      <v-scale-transition origin='center center'>
        <v-btn v-show='!dialog' v-bind='attrs' v-on='on' large icon absolute top left>
          <v-icon>mdi-playlist-music-outline</v-icon>
        </v-btn>
      </v-scale-transition>
    </template>
    <!-- 内容 -->
    <v-card max-height='492' max-width='280' rounded='lg' class='overflow-y-auto scroll' id='songlist_card' style='opacity: 0.8'>
      <!-- 标题 -->
      <v-banner sticky single-line color='grey darken-4' class='font-weight-bold'>
        <v-row>
          <v-col>
            <span>当前播放({{ index + 1 }}/{{ lists.length }})</span>
          </v-col>
          <v-col cols='auto'>
            <v-btn class='mr-4' color='cyan darken-4' x-small :to='route' @click='$emit("close")'>
              <v-icon small>mdi-near-me</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-banner>
      <!-- 列表 -->
      <v-list dense>
        <v-list-item-group :value='index' color='primary' mandatory>
          <v-list-item
            v-for='(item, index) in lists'
            :key='item.id'
            :id='"songlist_" + index'
            @click='chooseMusic(item.id)'
            @contextmenu.prevent='removeMusic(item.id)'
          >
            <v-list-item-content>
              <v-list-item-title class='font-weight-bold' v-text='item.name'></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    index: 0
  }),
  watch: {
    dialog(newValue) {
      newValue && this.openGoto()
      !newValue && this.closeGoto()
    },
    music: 'indexMusicInLists',
    lists: 'indexMusicInLists'
  },
  computed: {
    ...mapState({
      music: state => state.play.music, // 正在播放的歌曲信息
      lists: state => state.play.lists, // 音乐列表
      route: state => state.play.route // 添加歌曲列表时的路由地址
    })
  },
  methods: {
    ...mapMutations(['chooseMusic', 'removeMusic']),
    indexMusicInLists() {
      this.$nextTick(() => {
        this.index = this.lists.indexOf(this.music)
      })
    },
    // 打开菜单后滚动定位
    openGoto() {
      this.indexMusicInLists()
      const timeout = this.lists.length > 80 ? this.lists.length * 0.7 : 80
      setTimeout(() => {
        this.$vuetify.goTo('#songlist_' + this.index, {
          container: '#songlist_card',
          duration: 400,
          offset: -20,
          easing: 'easeOutQuad'
        })
      }, timeout)
    },
    // 关闭菜单后滚动定位
    closeGoto() {
      this.$vuetify.goTo(0, {
        container: '#songlist_card',
        duration: 400,
        offset: 0,
        easing: 'linear'
      })
    }
  }
}
</script>
