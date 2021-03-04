<template>
  <v-card rounded="lg" elevation="2">
    <!-- 标题 -->
    <v-card-title>
      {{ title + "（" + playlist.length + "）" }}
      <v-spacer></v-spacer>
      <!-- 切换按键 -->
      <div class="d-flex mr-2 align-end" v-if="maxPage !== 1">
        <!-- 分页选择滑块 -->
        <v-slider
          v-show="sliderShow"
          v-model="page"
          :min="1"
          :max="maxPage"
          step="1"
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
      class="d-flex"
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
    // @param Array { coverImgUrl: "", playCount: 0, name: "", id: 0 }[,{...}]
    playlist: { type: Array, required: true },
    title: { type: String, required: true },
  },
  data: () => ({
    page: 1, // 当前浏览页数
    maxPage: 1, // 最大页数
    count: 20, // 单页显示数量
    lists: [], // 显示的列表
    sliderShow: false, // 滑块显示
    scrollLeft: 0, // 存放上次滚动条距左边的位置
  }),
  created() {
    // 向上取整
    this.maxPage = Math.ceil(this.playlist.length / this.count);
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
        this.lists = this.playlist.slice(
          this.count * (this.page - 1),
          this.count * this.page
        );
      } else {
        this.lists = this.playlist.slice(this.count * (this.page - 1));
      }
    },
    // 使用鼠标滚轮横向滚动
    mouseWheel(event) {
      const wheel = this.$refs.songCard.scrollLeft;
      if (event.deltaY < 0) {
        // 向上
        if (wheel != 0) {
          event.preventDefault();
          this.$refs.songCard.scrollLeft += event.deltaY;
        }
      } else {
        // 向下
        if (this.scrollLeft == 0 || wheel != this.scrollLeft) {
          event.preventDefault();
          this.$refs.songCard.scrollLeft += event.deltaY;
        }
      }
      this.scrollLeft = wheel;
    },
  },
};
</script>
