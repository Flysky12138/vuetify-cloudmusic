<template>
  <v-container>
    <v-expand-transition>
      <v-sheet v-show="isShow">
        <discover-catlist-item
          v-for="item in value"
          :key="item.id"
          :head="item.sort"
          :items="item.names"
        />
        <div class="my-1"></div>
      </v-sheet>
    </v-expand-transition>
    <v-row class="px-3" align="center">
      <v-col>
        <span class="text-h6 font-weight-bold">全部</span>
      </v-col>
      <v-col cols="auto" class="pa-0 mx-auto">
        <v-btn color="primary" icon @click="isShow = !isShow">
          <v-icon>{{ isShow ? "mdi-pan-up" : "mdi-pan-down" }}</v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-end">
        <v-btn text rounded class="text--secondary font-weight-bold">
          热门
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DiscoverCatlistItem from "./DiscoverCatlistItem.vue";
export default {
  props: {
    value: { type: Array, required: true },
  },
  components: { DiscoverCatlistItem },
  data: () => ({
    isShow: false,
  }),
};
</script>
