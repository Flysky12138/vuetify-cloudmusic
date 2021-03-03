<template>
  <v-card rounded="lg" elevation="2" :min-height="theHeight">
    <v-card-title>
      {{ title[type] + "（" + playlist.length + "）" }}
    </v-card-title>
    <v-card-text class="d-flex" style="overflow: auto">
      <template v-for="(item, index) in playlist">
        <song-card :value="item" />
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import SongCard from "components/Song/SongCard.vue";
export default {
  components: { SongCard },
  props: {
    uid: { type: String, required: true },
    type: { type: Number, default: 0, required: true },
  },
  data: () => ({
    title: ["创建的歌单", "收藏的歌单"],
    theHeight: 245, // 面板高度。避免获取数据前面板塌陷
    playlist: [],
  }),
  created() {
    this.getPlayList();
  },
  watch: {
    uid: "getPlayList",
  },
  methods: {
    getPlayList() {
      this.$http.user.playlist(this.uid, this.type).then((res) => {
        res.length === 0 ? (this.theHeight = 0) : (this.playlist = res);
      });
    },
  },
};
</script>
