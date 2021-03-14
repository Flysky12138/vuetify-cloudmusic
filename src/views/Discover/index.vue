<template>
  <v-container>
    <!-- 歌单分类标签 -->
    <v-row>
      <v-col cols="12">
        <discover-catlist :cat="params.cat" :value="catlist" />
      </v-col>
    </v-row>
    <!-- 歌单刷新前的骨架图 -->
    <v-row v-if="loading" justify="space-around">
      <v-col cols="auto" v-for="item in 30" :key="item" class="px-6">
        <v-skeleton-loader
          class="mb-12"
          width="120"
          height="120"
          type="image"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else justify="space-around" class="mt-0" id="playlistHead">
      <!-- 歌单 -->
      <v-col cols="auto" v-for="(item, index) in playlists" :key="index">
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
  name: "discover",
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
    loading: false,
  }),
  watch: {
    page(newValue) {
      this.params.offset = (newValue - 1) * this.params.limit;
      // 换页滚动到歌单顶部
      this.$vuetify.goTo("#playlistHead", {
        duration: 300, // 动画时长
        offset: 80, // 偏移
        easing: "easeOutQuad", // 动画
      });
      this.getPlatlist();
    },
  },
  created() {
    // 获取歌单分类
    this.$http.playlist.catlist().then((res) => {
      this.catlist = res;
    });
    if (this.$route.query.cat) {
      this.params.cat = this.$route.query.cat;
    }
    this.getPlatlist();
  },
  methods: {
    // 获取歌单
    getPlatlist() {
      this.loading = true;
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
          this.loading = false;
        });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.params.cat = to.query.cat ? to.query.cat : "全部";
    this.params.offset = 0;
    this.getPlatlist();
    this.page = 1;
    next();
  },
};
</script>
