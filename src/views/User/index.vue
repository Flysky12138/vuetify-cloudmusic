<template>
  <v-container>
    <v-row class="pa-3">
      <!-- 个人信息 -->
      <v-col cols="12">
        <user-detail :value="userDetail" />
      </v-col>
      <!-- 听歌排行 -->
      <v-col cols="12">
        <user-listen-ranking
          :value="userListenRanking.items"
          :loading="userListenRanking.loading"
          @change="getUserListenRanking"
        />
      </v-col>
      <!-- 歌单 -->
      <v-col cols="12" v-if="userPlaylist.create.length !== 0">
        <user-playlist :value="userPlaylist.create" title="创建的歌单" />
      </v-col>
      <v-col cols="12" v-if="userPlaylist.collect.length !== 0">
        <user-playlist :value="userPlaylist.collect" title="收藏的歌单" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserDetail from "./components/UserDetail.vue";
import UserPlaylist from "./components/UserPlaylist.vue";
import UserListenRanking from "./components/UserListenRanking.vue";
export default {
  components: { UserDetail, UserPlaylist, UserListenRanking },
  data: () => ({
    uid: 0,
    userDetail: {
      level: 0,
      createDays: 0,
      listenSongs: 0,
      profile: {
        avatarUrl: "",
        birthday: "",
        city: "",
        followeds: 0,
        follows: 0,
        gender: 0,
        nickname: "",
        province: "",
        signature: "",
      },
    },
    userListenRanking: {
      items: [],
      loading: false,
    },
    userPlaylist: {
      create: [],
      collect: [],
    },
  }),
  created() {
    this.uid = this.$route.query.uid;
    this.getUserDetail();
    this.getUserListenRanking();
    this.getUserPlaylist();
  },
  methods: {
    // 获取用户信息
    getUserDetail() {
      this.$http.user.detail(this.uid).then((res) => {
        this.userDetail = res;
      });
    },
    // 获取用户听歌排行
    getUserListenRanking(param = 0) {
      this.userListenRanking.loading = true;
      this.$http.user.record(this.uid, param === 0 ? 1 : 0).then((res) => {
        this.userListenRanking.items = res;
        this.userListenRanking.loading = false;
      });
    },
    // 获取用户歌单
    getUserPlaylist() {
      this.$http.user.playlist(this.uid).then((res) => {
        this.userPlaylist.create = res.create;
        this.userPlaylist.collect = res.collect;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.uid = to.query.uid;
    this.getUserDetail();
    this.getUserListenRanking();
    this.getUserPlaylist();
    next();
  },
};
</script>

