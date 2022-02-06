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
    <v-card max-width='280' rounded='lg' style='opacity: 0.8'>
      <!-- 标题 -->
      <v-banner sticky single-line class='font-weight-bold'>
        <v-row align='center'>
          <v-col>
            <span>当前播放({{ indexMusicInLists + 1 }}/{{ lists.length }})</span>
          </v-col>
          <v-col cols='auto'>
            <v-btn class='mx-4' color='cyan darken-4' x-small :to='route' @click='$emit("close")'>
              <v-icon small>mdi-near-me</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-banner>
      <!-- 播放列表 - 虚拟滚动 -->
      <v-virtual-scroll :items='lists' bench='11' max-height='440' item-height='40' class='scrollbar-hidden' ref='playerlists'>
        <template v-slot:default='{ item }'>
          <v-list :class='{"playItem": item.id === music.id}' dense class='py-0 d-flex align-center'>
            <v-list-item @click='chooseMusic(item.id)' @contextmenu.prevent='removeMusic(item.id)'>
              <v-list-item-content>
                <v-list-item-title class='font-weight-bold' :class='{"cyan--text": item.id === music.id}' v-text='item.name'></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </v-virtual-scroll>
    </v-card>
  </v-menu>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState, mapActions } from 'pinia'
export default {
  data: () => ({
    dialog: false
  }),
  watch: {
    dialog(newValue) {
      newValue && this.locateItem()
    }
  },
  computed: {
    ...mapState(playerStore, ['music', 'lists', 'route', 'indexMusicInLists'])
  },
  methods: {
    ...mapActions(playerStore, ['chooseMusic', 'removeMusic']),
    // 当前播放音乐置顶
    locateItem() {
      setTimeout(() => {
        this.$refs.playerlists.$el.scrollTop = this.indexMusicInLists * 40
      }, 50)
    }
  }
}
</script>

<style lang="scss" scoped>
.playItem {
  background-color: rgba($color: cyan, $alpha: 0.1);
}
</style>
