<template>
  <v-card rounded="lg" elevation="2">
    <!-- 标题 -->
    <v-card-title>
      {{ title + "（" + playlist.length + "）" }}
      <v-spacer></v-spacer>
      <!-- 切换按键 -->
      <div class="d-flex mr-2 align-center" v-if="maxPage !== 1">
        <v-btn small icon @click="page--" :disabled="page <= 1">
          <v-icon>mdi-pan-left</v-icon>
        </v-btn>
        <v-btn
          small
          icon
          disabled
          v-text="page + ' / ' + maxPage"
          class="mx-2"
        ></v-btn>
        <v-btn small icon @click="page++" :disabled="page >= maxPage">
          <v-icon>mdi-pan-right</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <!-- 歌单卡片 -->
    <v-card-text class="d-flex" style="overflow: auto" ref="songCard">
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
    count: 10, // 单页显示数量
    lists: [], // 显示的列表
  }),
  created() {
    // 向上取整
    this.maxPage = Math.ceil(this.playlist.length / this.count);
    this.getLists();
  },
  watch: {
    page() {
      this.getLists();
      this.$refs.songCard.scrollLeft = 0;
    },
  },
  methods: {
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
  },
};
</script>
