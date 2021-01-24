<template>
  <v-sheet>
    <v-menu
      v-for="item in bt"
      :key="item.id"
      rounded="lg"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          text
          rounded
          class="mr-6 text-subtitle-1 font-weight-bold"
          width="80"
        >
          {{ item.name }}
        </v-btn>
      </template>
      <v-list v-if="item.lists != undefind">
        <v-list-item
          v-for="i in item.lists"
          :key="i.id"
          class="px-0 justify-center"
        >
          <v-list-item-action class="ma-0">
            <v-btn text rounded class="text-subtitle-2 font-weight-bold">
              {{ i }}
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    bt: [
      {
        name: "首页",
      },
      {
        name: "歌单",
        lists: ["推荐", "官方", "精品", "华语", "流行", "欧美"],
      },
      {
        name: "个性",
      },
      {
        name: "关于",
      },
    ],
  }),
};
</script>
