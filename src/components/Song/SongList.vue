<template>
  <v-card elevation="0">
    <!-- 标题 -->
    <v-card-title>
      <span class="blue--text text--lighten-1">
        {{ '"' + title + '"' }}
      </span>
      <span
        class="blue--text text--lighten-2 font-italic text-caption ml-4 pt-2"
        v-text="subtitle"
      ></span>
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
      height="450"
      class="elevation-0 my-2"
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
      fixed-header
    >
      <!-- header.btns插槽 -->
      <template v-slot:header.btns>
        <button-play :value="items.map((res) => res.id)" tip="播放所有" />
      </template>
      <!-- item.count、item.btns插槽 -->
      <template v-slot:item.count="{ item }">
        <div>{{ items.indexOf(item) + 1 }}</div>
      </template>
      <template v-slot:item.btns="{ item }">
        <div class="d-flex justify-end">
          <button-add :value="item.id" />
          <button-play :value="item.id" />
        </div>
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
import { mapState } from "vuex";
import ButtonPlay from "components/Button/ButtonPlay.vue";
import ButtonAdd from "components/Button/ButtonAdd.vue";
export default {
  components: { ButtonPlay, ButtonAdd },
  props: {
    // 标题
    title: { type: String, required: true },
    // 描述
    subtitle: { type: Number, required: true },
    /* 内容
     * @params
     *  [{
     *    album:"《JJ陆》",
     *    artists:"林俊杰",
     *    duration:"03:45",
     *    id:108485,
     *    name:"Always Online"
     *  },{...}]
     */
    items: { type: Array, required: true },
    // 单页显示列表数
    itemsPerPage: { type: Number, default: 8 },
    // 是否正在加载
    loading: { type: Boolean, default: false },
  },
  data: () => ({
    search: "",
    page: 1, // 当前浏览页
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
     * 由于过滤搜索时会减少分页，因此当过滤后数据减少，可能会到最后一页，所以和oldValue比较大小，以便排除该事件
     * 效果：从数值小的一页跳转到数值更大的最后一页才会执行
     */
    page(newValue, oldValue) {
      if (newValue > oldValue && newValue === this.pageCount) {
        this.$emit("pageEnd", this.pageCount);
      }
    },
  },
  computed: {
    ...mapState({
      islogin: (state) => state.islogin,
    }),
  },
  methods: {
    // 回到某页
    toPage(param) {
      if (param <= this.pageCount) {
        this.page = param;
      }
    },
  },
};
</script>
