<template>
  <v-menu
    v-model="dialog"
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
        width="40"
        :aspect-ratio="16 / 9"
      ></v-responsive>
    </template>
    <v-card
      max-height="493"
      max-width="300"
      rounded="lg"
      class="overflow-y-auto scroll"
      id="songlist_card"
      style="opacity: 0.8"
    >
      <v-banner
        sticky
        single-line
        color="grey darken-4"
        class="font-weight-bold"
      >
        <span>ID: {{ music.id }}</span>
        <span class="mx-4">{{ index + 1 }} / {{ lists.length }}</span>
      </v-banner>
      <v-list dense>
        <v-list-item-group v-model="index" color="primary">
          <v-list-item
            v-for="(item, index) in lists"
            :key="item.id"
            :id="'songlist_' + index"
            @click="chooseMusicPlay(item.id)"
            @contextmenu.prevent="removeMusic(item.id)"
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
    ...mapMutations(["chooseMusicPlay", "removeMusic"]),
    // 打开菜单后滚动定位
    openGoto() {
      this.index = this.lists.indexOf(this.music);
      setTimeout(() => {
        this.$vuetify.goTo("#songlist_" + this.index, {
          container: "#songlist_card",
          duration: 400,
          offset: -20,
          easing: "easeOutQuad",
        });
      }, 80);
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
