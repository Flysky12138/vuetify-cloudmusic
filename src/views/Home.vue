<template>
  <v-container>
    <v-row justify="space-around" v-if="count != 1">
      <v-col cols="12" class="ml-4 mb-n8">
        <v-skeleton-loader type="card-heading" width="200"></v-skeleton-loader>
      </v-col>
      <v-col cols="auto" v-for="item in 30" :key="item" class="px-6">
        <v-skeleton-loader
          class="my-6"
          width="120"
          height="120"
          type="image"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <template v-else>
      <div class="d-flex align-center mx-6 mt-3">
        <span class="text-h6 font-weight-bold">推荐歌单</span>
        <v-spacer></v-spacer>
        <v-btn
          class="text--secondary font-weight-bold"
          text
          rounded
          to="/discover/playlist"
        >
          更多 >
        </v-btn>
      </div>
      <v-row justify="space-around" class="py-4">
        <v-col cols="auto" v-for="item in value" :key="item.id">
          <song-card :value="item" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import SongCard from "components/Song/SongCard.vue";
export default {
  components: { SongCard },
  data: () => ({
    count: 0,
    value: [],
  }),
  created() {
    this.$http.personalized(30).then((res) => {
      this.value = res;
      this.count++;
    });
  },
};
</script>
