<template>
  <v-card max-width="150" elevation="0">
    <v-img
      :src="value.coverImgUrl"
      class="ma-3 mb-0 text-end"
      style="border-radius: 10px"
      @click="toPlaylist"
      transition="slide-x-transition"
      width="126"
      height="126"
    >
      <!-- 图片加载前显示 -->
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
      <!-- 默认插槽 -->
      <template v-slot:default>
        <v-chip
          v-text="value.playCount"
          color="rgba(233, 237, 230, .75)"
          class="ma-1 px-2"
          x-small
        >
        </v-chip>
      </template>
    </v-img>
    <v-card-text class="text-caption py-1" v-text="value.name"> </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    value: { type: Object, required: true },
  },
  data: () => ({}),
  methods: {
    toPlaylist() {
      console.log(this.value.id);
    },
  },
};
</script>
