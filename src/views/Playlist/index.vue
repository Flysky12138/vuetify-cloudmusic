<template>
  <v-container>
    <!-- 获取数据前骨架图 -->
    <skeleton-loader v-if="playlistDetail.name === ''" />
    <v-row v-else>
      <v-col cols="12">
        <playlist-detail :value="playlistDetail" />
      </v-col>
      <v-col cols="12">
        <song-list
          :title="playlistDetail.name"
          :subtitle="songlistDetail.songlist.length"
          :value="songlistDetail.songlist"
          :itemsPerPage="9"
          :loading="songlistDetail.loading"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SkeletonLoader from "./components/SkeletonLoader.vue";
import PlaylistDetail from "./components/PlaylistDetail.vue";
import SongList from "components/Song/SongList";
export default {
  components: { SkeletonLoader, PlaylistDetail, SongList },
  data: () => ({
    id: 0,
    playlistDetail: {
      coverImgUrl: "",
      createTime: "",
      description: null,
      name: "",
      playCount: 0,
      shareCount: 0,
      subscribedCount: 0,
      tags: [],
      trackIds: [],
      userId: 0,
      avatarUrl: "",
      nickname: "",
    },
    songlistDetail: {
      songlist: [],
      loading: false,
    },
  }),
  created() {
    this.id = this.$route.query.id;
    this.getPlaylistDetail();
  },
  methods: {
    // 获取歌单信息
    getPlaylistDetail() {
      this.$http.playlist.detail(this.id).then((res) => {
        this.playlistDetail = res;
        this.getSonglistDetail(res.trackIds.join(","));
      });
    },
    // 获取歌单歌曲列表
    getSonglistDetail(ids) {
      this.songlistDetail.loading = true;
      this.$http.song.detail(ids).then((res) => {
        this.songlistDetail.songlist = res;
        this.songlistDetail.loading = false;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.id = to.query.id;
    this.getPlaylistDetail();
    next();
  },
};
</script>
