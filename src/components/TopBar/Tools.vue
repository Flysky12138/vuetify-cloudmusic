<template>
  <div class="d-flex">
    <div v-for="(item, index) in items" :key="index" class="d-flex">
      <component :is="componentId(item)" :value="item"></component>
      <div class="mx-5"></div>
    </div>
  </div>
</template>

<script>
import BtMenu from "./Tools/BtMenu.vue";
import BtNormal from "./Tools/BtNormal.vue";
export default {
  components: { BtMenu, BtNormal },
  data: () => ({
    items: [
      { name: "首页", link: "" },
      {
        name: "歌单",
        links: [
          { name: "推荐", link: "" },
          { name: "官方", link: "" },
          { name: "精品", link: "" },
          { name: "华语", link: "" },
          { name: "流行", link: "" },
          { name: "欧美", link: "" },
        ],
      },
      {
        name: "个性",
        links: [
          { name: "日推", link: "" },
          { name: "F M", link: "" },
        ],
      },
      { name: "关于", link: "" },
    ],
  }),
  methods: {
    componentId(data) {
      return typeof data.links === "undefined" ? BtNormal : BtMenu;
    },
  },
};
</script>
