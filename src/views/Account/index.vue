<template>
  <v-container>
    <v-row class="pa-3">
      <!-- 个人信息 -->
      <v-col cols="12">
        <user-detail :uid="uid" />
      </v-col>
      <!-- 歌单 -->
      <v-col cols="12">
        <song-sheet title="我创建的歌单" />
      </v-col>
      <v-col cols="12">
        <song-sheet title="我收藏的歌单" />
      </v-col>
      <!-- 听歌排行 -->
      <v-col cols="12">
        <list-listen :uid="uid" @allPlay="allPlay" @onePlay="onePlay" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListListen from "./components/ListListen.vue";
import SongSheet from "./components/SongSheet.vue";
import UserDetail from "./components/UserDetail.vue";
export default {
  components: { ListListen, SongSheet, UserDetail },
  data: () => ({
    uid: 0,
  }),
  created() {
    this.uid = this.$route.query.uid;
  },
  methods: {
    allPlay(e) {
      console.log(e);
    },
    onePlay(e) {
      console.log("e: ", e);
    },
  },
};
</script>

