<template>
  <v-row align="center" no-gutters>
    <v-col cols="2" v-for="(item, index) in items" :key="index">
      <component :is="whichComp(item)" :value="item"></component>
    </v-col>
  </v-row>
</template>

<script>
import BtMenu from "./Tools/BtMenu.vue";
import BtNormal from "./Tools/BtNormal.vue";
export default {
  components: { BtMenu, BtNormal },
  data: () => ({
    items: [
      { name: "首页", link: "/" },
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
    whichComp(value) {
      return typeof value.links === "undefined" ? BtNormal : BtMenu;
    },
  },
};
</script>
