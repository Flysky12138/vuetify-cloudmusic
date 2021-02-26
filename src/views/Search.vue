<template>
  <v-container>
    <song-list
      :title="keywords"
      :subtitle="songCount"
      :items="songs"
      :loading="loading"
      @pageEnd="getMoreSongs"
      ref="songList"
    />
  </v-container>
</template>

<script>
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
    this.searchSongs(this.keywords);
  },
  methods: {
    // 获取歌曲列表
    searchSongs(keywords, offset = 0, push = false) {
      this.loading = true;
      this.$http.song.search(keywords, offset).then((res) => {
        if (push) {
          this.songs.push.apply(this.songs, res.songs);
        } else {
          this.songs = res.songs;
          this.$refs.songList.toPage(1);
        }
        this.songCount = res.songCount;
        this.hasMore = res.hasMore;
        this.loading = false;
      });
    },
    // 获取更多歌曲列表
    getMoreSongs(page) {
      if (this.hasMore) {
        this.searchSongs(this.keywords, page / 4, true);
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.keywords = to.query.keywords;
    this.searchSongs(this.keywords);
    next();
  },
};
</script>

