<template>
  <v-menu
    :close-on-content-click="false"
    open-on-hover
    close-delay="100"
    transition="slide-x-transition"
    dark
  >
    <template v-slot:activator="{ on, attrs }">
      <v-responsive
        v-bind="attrs"
        v-on="on"
        width="30"
        :aspect-ratio="16 / 9"
        @mouseenter="openGoto"
      ></v-responsive>
    </template>
    <v-card
      max-height="498"
      min-width="180"
      max-width="300"
      rounded="lg"
      class="overflow-y-auto scroll"
      id="songlist_card"
      style="opacity: 0.8"
    >
      <v-list dense>
        <v-list-item-group :value="listsIndex" color="primary">
          <v-list-item
            v-for="(item, index) in lists"
            :key="item.id"
            :id="'songlist_' + index"
            @click="setlistsIndex(index)"
          >
            <v-list-item-title
              class="font-weight-bold"
              v-text="item.name"
            ></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      // 音乐ID数组列表
      lists: (state) => state.play.lists,
      // 正在播放的歌曲ID在lists数组中的下标
      listsIndex: (state) => state.play.music.listsIndex,
    }),
  },
  methods: {
    ...mapMutations(["setlistsIndex"]),
    // 打开菜单后滚动定位
    openGoto() {
      setTimeout(() => {
        this.$vuetify.goTo("#songlist_" + this.listsIndex, {
          container: "#songlist_card",
          duration: 400,
          offset: -55,
          easing: "easeOutQuad",
        });
      }, 120);
    },
  },
};
</script>
