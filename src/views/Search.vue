<template>
  <v-container>
    <song-list
      :title="keywords"
      :subtitle="songCount"
      :items="songs"
      :loading="loading"
      @pageEnd="getMoreSongs"
    />
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import SongList from "components/Song/SongList.vue";
export default {
  components: { SongList },
  data: () => ({
    keywords: "",
    songCount: 0,
    songs: [],
    hasMore: false,
    loading: false,
  }),
  created() {
    this.keywords = this.$route.query.keywords;
    this.searchSongs();
  },
  methods: {
    // 播放
    ...mapMutations({
      isPlay: "isPlay",
    }),
    // 获取歌曲列表
    searchSongs(offset = 0, push = false) {
      this.loading = true;
      this.$http.song.search(this.keywords, offset).then((res) => {
        if (push) {
          this.songs.push.apply(this.songs, res.songs);
        } else {
          this.songs = res.songs;
        }
        this.songCount = res.songCount;
        this.hasMore = res.hasMore;
        this.loading = false;
      });
    },
    // 获取更多歌曲列表
    getMoreSongs(offset) {
      if (this.hasMore) {
        this.searchSongs(offset / 4, true);
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.keywords = to.query.keywords;
    this.searchSongs();
    next();
  },
};
</script>

