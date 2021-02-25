<template>
  <v-card elevation="0">
    <!-- 标题 -->
    <v-card-title>
      <span class="blue--text text--lighten-2" v-text="title"></span>
      <v-spacer></v-spacer>
      <div width="100">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filter"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </v-card-title>
    <!-- 表格 -->
    <v-data-table
      height="440"
      class="elevation-0 mb-4"
      :headers="headers"
      :items="items"
      item-key="count"
      hide-default-footer
      disable-sort
      :search="search"
      no-results-text="没有结果"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      @page-count="pageCount = $event"
    >
      <!-- header插槽 -->
      <template v-slot:header.btns>
        <v-tooltip left open-delay="800">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-motion-play-outline</v-icon>
            </v-btn>
          </template>
          播放所有
        </v-tooltip>
      </template>
      <!-- item插槽 -->
      <template v-slot:item.duration="{ item }">
        <div>{{ getDuration(item.duration) }}</div>
      </template>
      <template v-slot:item.count="{ item }">
        <div>{{ items.indexOf(item) + 1 }}</div>
      </template>
      <template v-slot:item.btns="{ item }">
        <v-btn icon v-if="islogin">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
        <v-btn icon @click="isPlay(item.id)">
          <v-icon>mdi-motion-play-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!-- 分页按键 -->
    <v-pagination
      v-model="page"
      :length="pageCount"
      :total-visible="7"
      circle
      color="blue lighten-2"
    ></v-pagination>
  </v-card>
</template>

<script>
import songTime from "common/songTime";
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    search: "",
    page: 1, // 当前浏览页
    itemsPerPage: 8, // 单页显示列表数
    pageCount: 0, // 分页数
    // 表头
    headers: [
      { text: "#", align: "center", value: "count" },
      { text: "歌曲标题", value: "name" },
      { text: "时长", value: "duration" },
      { text: "歌手", value: "artists" },
      { text: "专辑", value: "album" },
      { text: "", align: "right", value: "btns" },
    ],
  }),
  computed: {
    ...mapState({
      islogin: (state) => state.islogin,
    }),
  },
  methods: {
    ...mapMutations({
      isPlay: "play/isPlay",
    }),
    getDuration(param) {
      return songTime(param);
    },
  },
};
</script>
