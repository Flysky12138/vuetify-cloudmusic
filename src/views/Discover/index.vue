<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <discover-catlist :value="catlist" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DiscoverCatlist from "./components/DiscoverCatlist.vue";
export default {
  components: { DiscoverCatlist },
  data: () => ({
    catlist: [],
  }),
  created() {
    // 获取歌单分类
    this.$http.playlist.catlist().then((res) => {
      this.catlist = res;
    });
  },
};
</script>
