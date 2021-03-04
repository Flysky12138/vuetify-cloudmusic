<template>
  <v-container>
    <v-row class="pa-3">
      <!-- 个人信息 -->
      <v-col cols="12">
        <user-detail :uid="uid" />
      </v-col>
      <!-- 歌单 -->
      <template v-if="!isShow">
        <v-skeleton-loader
          width="100%"
          height="240"
          class="ma-3"
          type="image@2"
        ></v-skeleton-loader>
        <v-skeleton-loader
          width="100%"
          height="240"
          class="ma-3"
          type="image@2"
        ></v-skeleton-loader>
      </template>
      <template v-else>
        <v-col cols="12">
          <playlist-collection :playlist="playlist.create" title="创建的歌单" />
        </v-col>
        <v-col cols="12">
          <playlist-collection
            :playlist="playlist.collect"
            title="收藏的歌单"
          />
        </v-col>
      </template>
      <!-- 听歌排行 -->
      <v-col cols="12">
        <v-lazy
          :options="{ threshold: 1 }"
          min-height="200"
          transition="fade-transition"
        >
          <listen-list :uid="uid" />
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserDetail from "./components/UserDetail.vue";
import PlaylistCollection from "./components/PlaylistCollection.vue";
import ListenList from "./components/ListenList.vue";
export default {
  components: { UserDetail, PlaylistCollection, ListenList },
  data: () => ({
    uid: 0,
    playlist: {}, // 歌单列表
    isShow: false,
  }),
  created() {
    this.uid = this.$route.query.uid;
    this.getPlayList();
  },
  methods: {
    // 获取歌单列表
    getPlayList() {
      this.$http.user.playlist(this.uid).then((res) => {
        this.playlist = res;
        this.isShow = true;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.uid = to.query.uid;
    this.getPlayList();
    next();
  },
};
</script>

