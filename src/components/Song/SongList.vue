<template>
  <v-data-table
    class="elevation-0"
    :headers="headers"
    :items="value"
    :item-class="playItemStyle"
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
    <!-- top插槽 -->
    <template v-slot:top>
      <div class="d-flex align-end pb-4 px-3 blue--text" id="tableTop">
        <span class="text--lighten-1 text-h5">
          {{ '"' + title + '"' }}
        </span>
        <span
          class="text--lighten-2 font-italic text-caption ml-4"
          v-text="subtitle"
        ></span>
        <v-spacer></v-spacer>
        <v-sheet width="200">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            single-line
            hide-details
          ></v-text-field>
        </v-sheet>
      </div>
    </template>
    <!-- header.btns插槽 -->
    <template v-slot:header.btns>
      <button-play
        :id="value.map((res) => res.id)"
        :disable="loading"
        tip="播放所有"
      />
    </template>
    <!-- item.count插槽 -->
    <template v-slot:item.count="{ item }">
      <div>{{ value.indexOf(item) + 1 }}</div>
    </template>
    <!-- item.btns插槽 -->
    <template v-slot:item.btns="{ item }">
      <div class="d-flex justify-end">
        <button-delete v-if="own" :id="item.id" @success="delValueItem" />
        <button-add v-else :id="item.id" />
        <button-play :id="item.id" />
      </div>
    </template>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <v-pagination
        v-if="pageCount > 1"
        v-model="page"
        :length="pageCount"
        :total-visible="7"
        circle
        color="blue lighten-2"
        class="my-3"
      ></v-pagination>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from "vuex";
import ButtonDelete from "components/Button/ButtonDelete.vue";
import ButtonPlay from "components/Button/ButtonPlay.vue";
import ButtonAdd from "components/Button/ButtonAdd.vue";
export default {
  components: { ButtonDelete, ButtonPlay, ButtonAdd },
  props: {
    // 标题
    title: { type: String, required: true },
    // 描述
    subtitle: { type: [Number, String], required: true },
    // 内容
    // @params Array
    // { album:String, artists:String, duration:String, id:Number, name:String }[,{...}]
    value: { type: Array, required: true },
    // 单页显示列表数
    itemsPerPage: { type: Number, default: 9 },
    // 是否正在加载
    loading: { type: Boolean, default: false },
    // 是否是自己的歌单
    own: { type: Boolean, default: false },
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
  computed: {
    ...mapState({
      id: (state) => state.play.music.id,
    }),
  },
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
      // 换页滚动到表格顶部
      this.$vuetify.goTo("#tableTop", {
        duration: 600, // 动画时长
        offset: 0, // 偏移
        easing: "easeOutQuad", // 动画
      });
    },
  },
  methods: {
    // 删除一项
    delValueItem(id) {
      const index = this.value.findIndex((res) => res.id === id);
      this.value.splice(index, 1);
    },
    // 设置正在播放歌曲项的类
    playItemStyle(params) {
      return params.id === this.id ? "playItem" : "";
    },
  },
};
</script>

<style lang="scss">
.playItem {
  color: #d500f9;
}
</style>
