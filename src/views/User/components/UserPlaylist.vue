<template>
  <v-card elevation='0' rounded='lg'>
    <!-- 标题 -->
    <v-card-title class='pt-0'>
      {{ title + '（' + value.length + '）' }}
      <v-spacer></v-spacer>
      <!-- 换页按键 -->
      <div class='d-flex align-center mr-2' v-if='maxPage !== 1'>
        <v-btn small icon @click='page--' :disabled='page <= 1' color='primary'>
          <v-icon>mdi-pan-left</v-icon>
        </v-btn>
        <v-card-subtitle class='green--text py-0' v-text='page + " / " + maxPage'></v-card-subtitle>
        <v-btn small icon @click='page++' :disabled='page >= maxPage' color='primary'>
          <v-icon>mdi-pan-right</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <!-- 歌单卡片 -->
    <v-hover v-slot='{ hover }'>
      <v-card-text class='d-flex px-1 overflow-x-auto scrollbar-hidden' ref='songCard'>
        <div class='userPlaylist_left' v-show='hover && scrollButton.left'>
          <v-btn dark icon class='userPlaylist_btn' @click='onScrollButton(-1)'>
            <v-icon large>mdi-chevron-left</v-icon>
          </v-btn>
        </div>
        <song-card v-for='item in lists' :key='item.id' :value='item' />
        <div class='userPlaylist_right' v-show='hover && scrollButton.right'>
          <v-btn dark icon class='userPlaylist_btn' @click='onScrollButton(1)'>
            <v-icon large>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-hover>
  </v-card>
</template>

<script>
import SongCard from 'components/Song/SongCard.vue'
export default {
  components: { SongCard },
  props: {
    value: { type: Array, required: true },
    title: { type: String, required: true }
  },
  data: () => ({
    page: 1, // 当前浏览页数
    maxPage: 1, // 最大页数
    count: 20, // 单页显示数量
    lists: [], // 显示的列表
    // 滚动按键显示
    scrollButton: {
      left: false,
      right: false
    }
  }),
  created() {
    this.init()
  },
  mounted() {
    this.scrollButtonShow()
  },
  watch: {
    value: 'init',
    // 换页回顶
    page() {
      this.getLists()
      this.$refs.songCard.scrollLeft = 0
      this.scrollButton.left = false
      this.scrollButtonShow()
    }
  },
  methods: {
    // 初始化
    init() {
      this.page = 1
      this.maxPage = Math.ceil(this.value.length / this.count) // 向上取整
      this.getLists()
    },
    // 获取需要显示的一段数据
    getLists() {
      this.lists = this.value.slice(this.count * (this.page - 1), this.count * this.page)
    },
    // 左右按键是否显示
    scrollButtonShow() {
      const scrollLeft = this.$refs.songCard.scrollLeft
      const clientWidth = this.$refs.songCard.clientWidth
      const scrollWidth = this.$refs.songCard.scrollWidth
      this.scrollButton.left = !!scrollLeft
      this.scrollButton.right = scrollLeft + clientWidth + 1 < scrollWidth
    },
    // 横向滚动
    async onScrollButton(direction) {
      const speed = 40 // 每动画帧滚动条移动的距离
      let frames = Math.ceil((this.$refs.songCard.clientWidth - 120) / speed) // 帧数=需滚动宽度/一帧滚动宽度
      while (frames-- > 0) {
        await new Promise(solve => {
          requestAnimationFrame(() => {
            const oldScrollLeft = this.$refs.songCard.scrollLeft
            this.$refs.songCard.scrollLeft = oldScrollLeft + speed * direction
            this.$refs.songCard.scrollLeft === oldScrollLeft && (frames = 0) // 在指定帧数内滚动到一端后，提前结束递归，避免滚动按键隐藏延迟
            solve()
          })
        })
      }
      this.scrollButtonShow()
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin userPlaylist {
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 1;
  margin-top: 4px;
  height: 126px;
  pointer-events: none;
}
.userPlaylist_left {
  @include userPlaylist;
  left: 16px;
}
.userPlaylist_right {
  @include userPlaylist;
  right: 16px;
}
.userPlaylist_btn {
  pointer-events: auto;
  background-color: rgba(90, 90, 90, 0.75);
}
</style>
