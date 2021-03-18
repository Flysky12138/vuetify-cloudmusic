<template>
  <v-row class="overflow-y-auto scroll" style="height: 80vh">
    <v-col cols="12" class="text-center">
      <v-responsive height="25vh"></v-responsive>
      <div
        v-for="item in 300"
        :key="item"
        :id="'songlyrics_' + item"
        class="my-6 font-weight-bold"
        :style="lyricsStyle(item)"
      >
        {{ item }}
      </div>
      <v-responsive height="42vh"></v-responsive>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    playitem: 1, // 当前播放的歌词
  }),
  mounted() {
    setTimeout(() => {
      this.playitem = 30;
    }, 1000);
  },
  watch: {
    playitem() {
      this.$vuetify.goTo("#songlyrics_" + this.playitem, {
        container: ".scroll",
        duration: 400,
        offset: 157,
        easing: "easeOutQuad",
      });
    },
  },
  methods: {
    lyricsStyle(params) {
      // 根据当前播放位置，返回所有歌词样式
      let offset = Math.abs(params - this.playitem);
      if (offset === 0) {
        return {
          "font-size": "30px",
        };
      } else if (offset < 4) {
        return {
          opacity: (10 - offset) * 0.1,
        };
      } else {
        return {
          opacity: 0.4,
        };
      }
    },
  },
};
</script>
