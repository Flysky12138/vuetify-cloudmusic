<template>
  <v-card elevation="0">
    <!-- 标题 -->
    <v-card-title>
      <span class="blue--text text--lighten-1">
        {{ '"' + title + '"' }}
      </span>
      <span
        class="blue--text text--lighten-2 font-italic text-caption ml-4"
        style="padding-top: 6px"
        v-text="subtitle"
      >
      </span>
      <v-spacer></v-spacer>
      <div width="100">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </v-card-title>
    <!-- 表格 -->
    <v-data-table
      height="440"
      class="elevation-0 mt-2 mb-4"
      :headers="headers"
      :items="items"
      item-key="count"
      hide-default-footer
      disable-sort
      :search="search"
      no-results-text="没有找到匹配项"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      @page-count="pageCount = $event"
      :loading="loading"
    >
      <!-- header插槽 -->
      <template v-slot:header.btns>
        <v-tooltip left open-delay="800">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="isPlay(items.map((res) => res.id))">
              <v-icon>mdi-motion-play-outline</v-icon>
            </v-btn>
          </template>
          播放所有
        </v-tooltip>
      </template>
      <!-- item插槽 -->
      <template v-slot:item.count="{ item }">
        <div>{{ items.indexOf(item) + 1 }}</div>
      </template>
      <template v-slot:item.btns="{ item }">
        <v-btn icon v-if="islogin">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
        <v-btn icon @click="isPlay([item.id])">
          <v-icon>mdi-motion-play-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!-- 分页按键 -->
    <v-pagination
      v-show="pageCount"
      v-model="page"
      :length="pageCount"
      :total-visible="7"
      circle
      color="blue lighten-2"
    ></v-pagination>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
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
      { text: "歌手", value: "artists" },
      { text: "专辑", value: "album" },
      { text: "时长", value: "duration" },
      { text: "", align: "right", value: "btns" },
    ],
  }),
  watch: {
    /*
     * 到达最后一页时抛出事件
     * 由于过滤搜索时会减少分页，所以和oldValue比较大小，以便排除该事件
     */
    page(newValue, oldValue) {
      if (newValue === this.pageCount && newValue > oldValue) {
        this.$emit("pageEnd", this.page);
      }
    },
  },
  computed: {
    ...mapState({
      islogin: (state) => state.islogin,
    }),
  },
  methods: {
    ...mapMutations({
      isPlay: "play/isPlay",
    }),
    // 回到某页
    toPage(param) {
      if (param <= this.pageCount) {
        this.page = param;
      }
    },
  },
};
</script>

<style lang="scss">
* {
  outline: none;
}
</style>
