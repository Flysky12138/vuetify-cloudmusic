<template>
  <v-card rounded="lg" elevation="2">
    <!-- 标题 -->
    <v-card-title>
      {{ title + "（" + value.length + "）" }}
      <v-spacer></v-spacer>
      <!-- 切换按键 -->
      <div class="d-flex mr-2 align-end" v-if="maxPage !== 1">
        <!-- 分页选择滑块 -->
        <v-slider
          v-show="sliderShow"
          v-model="page"
          :min="1"
          :max="maxPage"
          thumb-label="always"
          :thumb-size="24"
          class="my-n6 mr-3"
          style="width: 200px"
          @mouseup="sliderShow = false"
        ></v-slider>
        <!-- 左 -->
        <v-btn small icon @click="page--" :disabled="page <= 1" color="primary">
          <v-icon>mdi-pan-left</v-icon>
        </v-btn>
        <!-- 中 -->
        <v-btn
          small
          text
          color="success"
          v-text="page + ' / ' + maxPage"
          @click="sliderShow = true"
        ></v-btn>
        <!-- 右 -->
        <v-btn
          small
          icon
          @click="page++"
          :disabled="page >= maxPage"
          color="primary"
        >
          <v-icon>mdi-pan-right</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <!-- 歌单卡片 -->
    <v-card-text
      class="d-flex px-1"
      style="overflow: auto"
      ref="songCard"
      @mousewheel="mouseWheel"
    >
      <song-card v-for="item in lists" :key="item.id" :value="item" />
    </v-card-text>
  </v-card>
</template>

<script>
import SongCard from "components/Song/SongCard.vue";
export default {
  components: { SongCard },
  props: {
    value: { type: Array, required: true },
    title: { type: String, required: true },
  },
  data: () => ({
    page: 1, // 当前浏览页数
    maxPage: 1, // 最大页数
    count: 20, // 单页显示数量
    lists: [], // 显示的列表
    sliderShow: false, // 滑块换页显示
  }),
  created() {
    // 向上取整
    this.maxPage = Math.ceil(this.value.length / this.count);
    this.getLists();
  },
  watch: {
    // 换页回顶
    page() {
      this.getLists();
      this.$refs.songCard.scrollLeft = 0;
    },
  },
  methods: {
    // 获取需要显示的一段数据
    getLists() {
      if (this.page < this.maxPage) {
        this.lists = this.value.slice(
          this.count * (this.page - 1),
          this.count * this.page
        );
      } else {
        this.lists = this.value.slice(this.count * (this.page - 1));
      }
    },
    // 使用鼠标滚轮横向滚动
    mouseWheel(event) {
      const scrollLeft = this.$refs.songCard.scrollLeft;
      const clientWidth = this.$refs.songCard.clientWidth;
      const scrollWidth = this.$refs.songCard.scrollWidth;
      if (
        // 向上
        (event.deltaY < 0 && scrollLeft !== 0) ||
        // 向下
        (event.deltaY > 0 && scrollLeft + clientWidth + 2 < scrollWidth)
      ) {
        event.preventDefault();
        this.$refs.songCard.scrollLeft += event.deltaY;
      }
    },
  },
};
</script>
