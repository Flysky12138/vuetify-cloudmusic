<template>
  <v-container>
    <song-detail :id="id" />
  </v-container>
</template>

<script>
import SongDetail from "./components/SongDetail.vue";
export default {
  components: { SongDetail },
  data: () => ({
    id: 0,
  }),
  created() {
    this.id = this.$route.query.id;
  },
  beforeRouteUpdate(to, from, next) {
    this.id = to.query.id;
    next();
  },
};
</script>
