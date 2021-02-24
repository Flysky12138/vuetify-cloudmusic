<template>
  <v-container>
    <song-list title="songs" />
  </v-container>
</template>

<script>
import SongList from "components/Song/SongList.vue";
export default {
  components: { SongList },
  data: () => ({}),
  created() {
    // this.$http.song.search("letter");
  },
};
</script>

