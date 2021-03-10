<template>
  <v-container>
    <v-row justify="space-around" class="pa-3" v-if="count != 1">
      <v-col cols="auto" v-for="item in 30" :key="item">
        <v-skeleton-loader
          class="my-3"
          width="160"
          height="160"
          type="image"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <template v-else>
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
