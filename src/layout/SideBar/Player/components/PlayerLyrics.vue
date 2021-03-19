<template>
  <v-row class="overflow-y-auto scroll" style="height: 530px">
    <v-col cols="12" class="text-center">
      <v-responsive height="200"></v-responsive>
      <div
        v-for="(item, index) in value"
        :key="item.id"
        :id="'songlyrics_' + index"
        class="my-6 font-weight-bold"
        :style="lyricsStyle(index)"
      >
        {{ item.value }}
      </div>
      <v-responsive height="234"></v-responsive>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    value: { type: Array, required: true },
  },
  data: () => ({
    playitem: 0, // 当前播放的歌词在数组位置
  }),
  watch: {
    // 滚动到正在播放的歌词
    playitem() {
      this.$vuetify.goTo("#songlyrics_" + this.playitem, {
        container: ".scroll",
        duration: 400,
        offset: 192,
        easing: "easeOutQuad",
      });
    },
    playDt(newValue) {
      for (let i = 0; i < this.value.length; i++) {
        if (this.value[i].time < newValue) {
          this.playitem = i;
        } else {
          return;
        }
      }
    },
    // 换歌回顶
    value() {
      this.playitem = 0;
    },
  },
  computed: {
    ...mapState({
      playDt: (state) => state.play.music.dt, // 当前播放音乐所在的时间
    }),
  },
  methods: {
    lyricsStyle(params) {
      // 根据当前播放位置，返回所有歌词样式
      let offset = Math.abs(params - this.playitem);
      switch (offset) {
        case 0:
          return { "font-size": "30px", color: "#0D47A1" };
        case 1:
        case 2:
        case 3:
        case 4:
          return { opacity: (10 - offset) * 0.1 };
        default:
          return { opacity: 0.5 };
      }
    },
  },
};
</script>
