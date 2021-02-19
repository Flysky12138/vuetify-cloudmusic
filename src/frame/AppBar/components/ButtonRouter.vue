<template>
  <v-row align="center" no-gutters>
    <v-col cols="2" v-for="(item, index) in items" :key="index">
      <!-- 普通按键 -->
      <template v-if="typeof item.links === 'undefined'">
        <v-btn
          text
          rounded
          class="text-subtitle-1 font-weight-bold"
          width="5vw"
          :to="item.link"
        >
          {{ item.name }}
        </v-btn>
      </template>
      <!-- 菜单按键 -->
      <template v-else>
        <v-menu
          rounded="lg"
          transition="slide-y-transition"
          offset-y
          nudge-bottom="10vh"
          open-on-hover
          close-delay="100"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
              rounded
              class="text-subtitle-1 font-weight-bold pl-7"
              width="5vw"
            >
              {{ item.name }}
              <v-icon x-small class="pt-1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in item.links"
              :key="index"
              class="d-flex justify-center px-0"
            >
              <v-list-item-action class="ma-0">
                <v-btn
                  text
                  rounded
                  class="text-subtitle-2 font-weight-bold"
                  :to="item.link"
                >
                  {{ item.name }}
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
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
};
</script>
