<template>
  <v-container class="py-2">
    <v-row>
      <v-col cols="auto">
        <span class="ml-1 font-weight-bold text-subtitle-2">{{ head }}</span>
      </v-col>
      <v-col cols="11" class="d-flex align-center flex-wrap">
        <song-chip v-for="item in items" :key="item.id" :value="item" class="mr-2 mb-2" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongChip from "components/Song/SongChip.vue";
export default {
  props: {
    head: { type: String, required: true },
    items: { type: Array, required: true }
  },
  components: { SongChip },
  data: () => ({
    isShow: false
  })
};
</script>
