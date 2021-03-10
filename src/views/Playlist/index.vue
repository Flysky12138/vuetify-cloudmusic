<template>
  <v-container>
    <!-- 获取数据前骨架图 -->
    <skeleton-loader v-if="count != 1" />
    <v-row v-else>
      <v-col cols="12">
        <playlist-detail :value="playlistDetail" />
      </v-col>
      <v-col cols="12">
        <song-list
          :title="playlistDetail.name"
          :subtitle="songlistDetail.songlist.length"
          :value="songlistDetail.songlist"
          :loading="songlistDetail.loading"
          :itemsPerPage="30"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SkeletonLoader from "./components/SkeletonLoader.vue";
import PlaylistDetail from "./components/PlaylistDetail.vue";
import SongList from "components/Song/SongList";
import axios from "axios";
export default {
  components: { SkeletonLoader, PlaylistDetail, SongList },
  data: () => ({
    count: 0,
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
        this.getSonglistDetail(res.trackIds);
        this.count++;
      });
    },
    // 获取歌单歌曲列表
    getSonglistDetail(idsArr) {
      this.songlistDetail.loading = true;
      // 每500首请求一次，数量过多会报错
      const count = Math.ceil(idsArr.length / 500);
      // 存放请求函数的数组
      let funcHttp = [];
      for (let i = 0; i < count; i++) {
        funcHttp.push(
          this.$http.song.detail(idsArr.slice(500 * i, 500 * (i + 1)))
        );
      }
      // 开始请求
      axios.all(funcHttp).then((res) => {
        res.forEach((element) => {
          this.songlistDetail.songlist = this.songlistDetail.songlist.concat(
            element
          );
        });
        this.songlistDetail.loading = false;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.id = to.query.id;
    this.count = 0;
    this.getPlaylistDetail();
    next();
  },
};
</script>
