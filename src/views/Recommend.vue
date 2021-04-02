<template>
  <v-container>
    <song-list
      :title="title"
      :subtitle="subtitle"
      :value="value"
      :loading="loading"
      :itemsPerPage="itemsPerPage"
    />
  </v-container>
</template>

<script>
import time from "common/time";
import SongList from "components/Song/SongList.vue";
export default {
  name: "recommend",
  components: { SongList },
  data: () => ({
    title: " 日推歌曲列表",
    subtitle: 0,
    value: [],
    itemsPerPage: 1,
    loading: false,
  }),
  created() {
    this.loading = true;
    this.title = time.nowDate() + this.title;
    this.$http.playlist.recommend().then((res) => {
      this.subtitle = res.length;
      this.value = res;
      this.itemsPerPage = res.length;
      this.loading = false;
    });
  },
};
</script>

