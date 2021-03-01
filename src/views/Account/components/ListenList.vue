<template>
  <v-card elevation="2" rounded="lg" style="overflow: hidden">
    <v-tabs v-model="tab" @change="getSongList($event)" right>
      <v-tab>最近一周</v-tab>
      <v-tab>所有时间</v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in 2" :key="item">
          <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
            class="elevation-0"
            height="532"
            :loading="loading"
            disable-sort
            fixed-header
            :items-per-page="items.length"
            no-data-text="暂无听歌记录"
          >
            <!-- header.btns插槽 -->
            <template v-slot:header.btns>
              <v-tooltip left open-delay="800">
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    @click="
                      $emit(
                        'allPlay',
                        items.map((res) => res.song.id)
                      )
                    "
                  >
                    <v-icon>mdi-motion-play-outline</v-icon>
                  </v-btn>
                </template>
                播放所有
              </v-tooltip>
            </template>
            <!-- item.btns插槽 -->
            <template v-slot:item.btns="{ item }">
              <v-btn icon @click="$emit('onePlay', item.song.id)">
                <v-icon>mdi-motion-play-outline</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  props: {
    uid: { type: String, required: true },
  },
  data: () => ({
    tab: 0,
    items: [], // 内容
    loading: false,
    headers: [
      { text: "#", align: "end", value: "playCount" },
      { text: "", value: "" },
      { text: "歌曲标题", value: "song.name" },
      { text: "歌手", value: "song.artists" },
      { text: "", align: "end", value: "btns" },
    ],
  }),
  created() {
    this.getSongList(0);
  },
  watch: {
    uid(newValue) {
      this.uid = newValue;
      this.getSongList(0);
    },
  },
  methods: {
    getSongList(type) {
      this.loading = true;
      this.items = [];
      this.$http.user.record(this.uid, type === 0 ? 1 : 0).then((res) => {
        this.items = res;
        this.loading = false;
      });
    },
  },
};
</script>
