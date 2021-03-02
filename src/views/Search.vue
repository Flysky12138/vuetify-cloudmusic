<template>
  <v-container>
    <list-song
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
import { mapMutations } from "vuex";
import ListSong from "components/Song/SongList.vue";
export default {
  components: { ListSong },
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
    // 播放
    ...mapMutations({
      isPlay: "isPlay",
    }),
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
    getMoreSongs(offset) {
      if (this.hasMore) {
        this.searchSongs(this.keywords, offset / 4, true);
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

