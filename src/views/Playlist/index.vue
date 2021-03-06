<template>
  <v-container>
    <!-- 获取数据前骨架图 -->
    <div v-if="playlistDetail.name === ''" class="d-flex">
      <v-skeleton-loader
        width="180"
        height="180"
        class="ma-2"
        type="image"
      ></v-skeleton-loader>
      <v-skeleton-loader
        width="400"
        type="card-heading,list-item-avatar,list-item@2"
      ></v-skeleton-loader>
    </div>
    <playlist-detail v-else :value="playlistDetail" />
  </v-container>
</template>

<script>
import PlaylistDetail from "./components/PlaylistDetail.vue";
export default {
  components: { PlaylistDetail },
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
