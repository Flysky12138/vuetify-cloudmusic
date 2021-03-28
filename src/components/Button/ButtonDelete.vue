<template>
  <v-btn icon @click="delSong">
    <v-icon>mdi-delete-circle-outline</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
  },
  data: () => ({}),
  methods: {
    // 从歌单删除歌曲
    delSong() {
      this.$http.playlist
        .tracks(this.$route.query.id, this.id, false)
        .then((res) => {
          this.$emit("success", this.id);
        });
    },
  },
};
</script>
