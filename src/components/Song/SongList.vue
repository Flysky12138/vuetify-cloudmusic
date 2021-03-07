<template>
  <v-card elevation="0">
    <!-- 标题 -->
    <v-card-title class="d-flex align-end pt-0">
      <span class="blue--text text--lighten-1">
        {{ '"' + title + '"' }}
      </span>
      <span
        class="blue--text text--lighten-2 font-italic text-caption ml-4"
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
    </v-card-title>
    <!-- 表格 -->
    <v-data-table
      class="elevation-0 mt-2 mb-3"
      :headers="headers"
      :items="value"
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
        <button-play :value="value.map((res) => res.id)" tip="播放所有" />
      </template>
      <!-- item.count、item.btns插槽 -->
      <template v-slot:item.count="{ item }">
        <div>{{ value.indexOf(item) + 1 }}</div>
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
      v-if="pageCount > 1"
      v-model="page"
      :length="pageCount"
      :total-visible="7"
      circle
      color="blue lighten-2"
    ></v-pagination>
  </v-card>
</template>

<script>
import ButtonPlay from "components/Button/ButtonPlay.vue";
import ButtonAdd from "components/Button/ButtonAdd.vue";
export default {
  components: { ButtonPlay, ButtonAdd },
  props: {
    // 标题
    title: { type: String, required: true },
    // 描述
    subtitle: { type: Number, required: true },
    // 内容
    // @params Array
    // { album:String, artists:String, duration:String, id:Number, name:String }[,{...}]
    value: { type: Array, required: true },
    // 单页显示列表数
    itemsPerPage: { type: Number, default: 9 },
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
};
</script>
