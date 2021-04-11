<template>
  <v-card elevation='1' rounded='lg'>
    <!-- 标题 -->
    <v-card-title>
      {{ title + '（' + value.length + '）' }}
      <v-spacer></v-spacer>
      <!-- 切换按键 -->
      <div class='d-flex mr-2 align-end' v-if='maxPage !== 1'>
        <!-- 分页选择滑块 -->
        <v-slider
          v-show='sliderShow'
          v-model='page'
          :min='1'
          :max='maxPage'
          thumb-label='always'
          thumb-size='24'
          ticks='always'
          tick-size='4'
          class='mr-3 my-n6'
          style='width: 200px'
        ></v-slider>
        <!-- 左 -->
        <v-btn small icon @click='page--' :disabled='page === 1' color='primary'>
          <v-icon>mdi-pan-left</v-icon>
        </v-btn>
        <!-- 中 -->
        <v-btn small text color='success' v-text='page + " / " + maxPage' @click='sliderShow = !sliderShow'></v-btn>
        <!-- 右 -->
        <v-btn small icon @click='page++' :disabled='page === maxPage' color='primary'>
          <v-icon>mdi-pan-right</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <!-- 歌单卡片 -->
    <v-card-text class='d-flex px-1 overflow-x-auto scroll' ref='songCard' @mousewheel='mouseWheel'>
      <song-card v-for='item in lists' :key='item.id' :value='item' />
    </v-card-text>
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
    sliderShow: false // 滑块换页显示
  }),
  created() {
    this.init()
  },
  watch: {
    value() {
      this.init()
    },
    // 换页回顶
    page() {
      this.getLists()
      this.$refs.songCard.scrollLeft = 0
    }
  },
  methods: {
    // 初始化
    init() {
      this.page = 1
      // 向上取整
      this.maxPage = Math.ceil(this.value.length / this.count)
      this.getLists()
    },
    // 获取需要显示的一段数据
    getLists() {
      this.lists = this.value.slice(this.count * (this.page - 1), this.count * this.page)
    },
    // 使用鼠标滚轮横向滚动
    mouseWheel(event) {
      // const scrollLeft = this.$refs.songCard.scrollLeft;
      const clientWidth = this.$refs.songCard.clientWidth
      const scrollWidth = this.$refs.songCard.scrollWidth
      // 可滑动
      if (clientWidth !== scrollWidth) {
        event.preventDefault()
        this.$refs.songCard.scrollLeft += event.deltaY
      }
    }
  }
}
</script>
