<template>
  <v-container>
    <song-list title="songs" :items="songs" />
  </v-container>
</template>

<script>
import SongList from "components/Song/SongList.vue";
export default {
  components: { SongList },
  data: () => ({
    songs: [
      {
        id: "",
        name: "I（Cover 金泰妍）",
        duration: 208866,
        artists: "Deer洁洁",
        album: "I",
      },
      {
        id: "",
        name: "I（Cover 金泰妍）",
        duration: 208866,
        artists: "Deer洁洁",
        album: "I",
      },
      {
        id: "",
        name: "I（Cover 金泰妍）",
        duration: 208866,
        artists: "Deer洁洁",
        album: "I",
      },
    ],
  }),
  created() {
    // this.$http.song.search("letter");
  },
};
</script>

