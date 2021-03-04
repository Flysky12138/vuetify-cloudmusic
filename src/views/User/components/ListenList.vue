<template>
  <v-card elevation="2" rounded="lg" style="overflow: hidden">
    <!-- 标题 -->
    <div
      class="d-flex align-end"
      style="height: 40px; position: absolute; z-index: 1"
    >
      <v-card-title class="pa-0 mx-4">听歌排行</v-card-title>
      <v-card-subtitle class="pa-0">
        实际播放时间过短的歌曲将不纳入计算
      </v-card-subtitle>
    </div>
    <!-- 选项卡 -->
    <v-tabs v-model="tab" @change="getSongList" right>
      <v-tab>最近一周</v-tab>
      <v-tab>所有时间</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in 2" :key="item">
        <!-- 表格 -->
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
          no-data-text="暂无听歌记录 或 用户设置了隐私权限"
        >
          <!-- header.btns插槽 -->
          <template v-slot:header.btns>
            <button-play
              :value="items.map((res) => res.song.id)"
              tip="播放所有"
            />
          </template>
          <!-- item.btns插槽 -->
          <template v-slot:item.btns="{ item }">
            <button-play :value="item.song.id" />
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ButtonPlay from "components/Button/ButtonPlay.vue";
export default {
  components: { ButtonPlay },
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
    this.getSongList();
  },
  watch: {
    uid: "getSongList",
  },
  methods: {
    getSongList() {
      this.loading = true;
      this.$http.user.record(this.uid, this.tab === 0 ? 1 : 0).then((res) => {
        this.items = res;
        this.loading = false;
      });
    },
  },
};
</script>
