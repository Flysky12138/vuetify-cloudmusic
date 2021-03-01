<template>
  <v-container>
    <v-row class="pa-3">
      <!-- 个人信息 -->
      <v-col cols="12">
        <user-detail :uid="uid" />
      </v-col>
      <!-- 歌单 -->
      <v-col cols="12">
        <song-sheet :uid="uid" :type="0" />
      </v-col>
      <v-col cols="12">
        <song-sheet :uid="uid" :type="1" />
      </v-col>
      <!-- 听歌排行 -->
      <v-col cols="12">
        <listen-list :uid="uid" @allPlay="allPlay" @onePlay="onePlay" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserDetail from "./components/UserDetail.vue";
import SongSheet from "./components/SongSheet.vue";
import ListenList from "./components/ListenList.vue";
export default {
  components: { UserDetail, SongSheet, ListenList },
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
  beforeRouteUpdate(to, from, next) {
    this.uid = to.query.uid;
    next();
  },
};
</script>

