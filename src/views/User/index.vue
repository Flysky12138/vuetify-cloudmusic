<template>
  <v-container>
    <v-row class="pa-3">
      <!-- 个人信息 -->
      <v-col cols="12">
        <user-detail :uid="uid" />
      </v-col>
      <!-- 歌单 -->
      <v-col cols="12">
        <playlist-collection :uid="uid" :type="0" />
      </v-col>
      <v-col cols="12">
        <playlist-collection :uid="uid" :type="1" />
      </v-col>
      <!-- 听歌排行 -->
      <v-col cols="12">
        <v-lazy
          v-model="isActive"
          :options="{ threshold: 0.5 }"
          min-height="300"
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
    isActive: false,
  }),
  created() {
    this.uid = this.$route.query.uid;
  },
  beforeRouteUpdate(to, from, next) {
    this.uid = to.query.uid;
    this.isActive = false;
    next();
  },
};
</script>

