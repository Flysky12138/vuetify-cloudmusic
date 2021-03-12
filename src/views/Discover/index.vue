<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <discover-catlist :cat="params.cat" :value="catlist" />
      </v-col>
    </v-row>
    <v-row justify="space-around" class="mt-0" id="playlistHead">
      <!-- 歌单 -->
      <v-col cols="auto" v-for="item in playlists" :key="item.id">
        <song-card :value="item" />
      </v-col>
      <!-- 分页 -->
      <v-col cols="12" class="pb-6" v-if="total > params.limit">
        <v-pagination
          v-model="page"
          :length="Math.ceil(total / params.limit)"
          :total-visible="7"
          circle
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DiscoverCatlist from "./components/DiscoverCatlist.vue";
import SongCard from "components/Song/SongCard.vue";
export default {
  components: { DiscoverCatlist, SongCard },
  data: () => ({
    catlist: [],
    playlists: [], // 显示的歌单列表
    total: 0, // 歌单总数
    page: 1, // 当前浏览页数
    // 歌单请求参数
    params: {
      cat: "全部",
      limit: 30,
      offset: 0,
      order: "hot",
    },
  }),
  watch: {
    page(newValue) {
      this.params.offset = (newValue - 1) * this.params.limit;
      this.getPlatlist();
      // 换页滚动到歌单顶部
      if (newValue != 1) {
        this.$vuetify.goTo("#playlistHead", {
          duration: 300, // 动画时长
          offset: 80, // 偏移
          easing: "easeOutQuad", // 动画
        });
      }
    },
  },
  created() {
    // 获取歌单分类
    this.$http.playlist.catlist().then((res) => {
      this.catlist = res;
    });
    this.getPlatlist();
  },
  methods: {
    // 获取歌单
    getPlatlist() {
      this.$http.playlist
        .top(
          this.params.cat,
          this.params.limit,
          this.params.offset,
          this.params.order
        )
        .then((res) => {
          this.playlists = res.playlists;
          this.total = res.total;
        });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.params.cat = to.query.cat;
    this.params.offset = 0;
    this.getPlatlist();
    this.page = 1;
    next();
  },
};
</script>
