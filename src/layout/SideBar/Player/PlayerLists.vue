<template>
  <v-menu
    v-model="dialog"
    :close-on-content-click="false"
    transition="slide-x-transition"
    dark
  >
    <!-- 按键 -->
    <template v-slot:activator="{ on, attrs }">
      <v-scale-transition origin="center center">
        <v-btn
          v-show="!dialog"
          v-bind="attrs"
          v-on="on"
          large
          icon
          absolute
          top
          left
        >
          <v-icon>mdi-playlist-music-outline</v-icon>
        </v-btn>
      </v-scale-transition>
    </template>
    <!-- 内容 -->
    <v-card
      max-height="493"
      max-width="300"
      rounded="lg"
      class="overflow-y-auto scroll"
      id="songlist_card"
      style="opacity: 0.8"
    >
      <!-- 标题 -->
      <v-banner
        sticky
        single-line
        color="grey darken-4"
        class="font-weight-bold"
      >
        <span>ID: {{ music.id }}</span>
        <span class="mx-4">{{ index + 1 }} / {{ lists.length }}</span>
      </v-banner>
      <!-- 列表 -->
      <v-list dense>
        <v-list-item-group :value="index" color="primary">
          <v-list-item
            v-for="(item, index) in lists"
            :key="item.id"
            :id="'songlist_' + index"
            @click="chooseMusic(item.id)"
            @contextmenu.prevent="removeMusic(item.id)"
          >
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold"
                v-text="item.name"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    dialog: false,
    index: 0,
  }),
  watch: {
    dialog(newValue) {
      newValue && this.openGoto();
      !newValue && this.closeGoto();
    },
    music() {
      this.index = this.lists.indexOf(this.music);
    },
    lists() {
      this.$nextTick(() => {
        this.index = this.lists.indexOf(this.music);
      });
    },
  },
  computed: {
    ...mapState({
      music: (state) => state.play.music, // 正在播放的歌曲信息
      lists: (state) => state.play.lists, // 音乐列表
    }),
  },
  methods: {
    ...mapMutations(["chooseMusic", "removeMusic"]),
    // 打开菜单后滚动定位
    openGoto() {
      this.index = this.lists.indexOf(this.music);
      const timeout = this.lists.length > 80 ? this.lists.length * 0.7 : 80;
      setTimeout(() => {
        this.$vuetify.goTo("#songlist_" + this.index, {
          container: "#songlist_card",
          duration: 400,
          offset: -20,
          easing: "easeOutQuad",
        });
      }, timeout);
    },
    // 关闭菜单后滚动定位
    closeGoto() {
      this.$vuetify.goTo(0, {
        container: "#songlist_card",
        duration: 400,
        offset: 0,
        easing: "easeOutQuad",
      });
    },
  },
};
</script>
