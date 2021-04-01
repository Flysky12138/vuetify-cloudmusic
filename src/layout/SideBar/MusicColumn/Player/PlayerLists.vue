<template>
  <v-menu
    v-model="isopen"
    :close-on-content-click="false"
    transition="slide-x-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon large tile @click="openGoto">
        <v-icon>mdi-playlist-music</v-icon>
      </v-btn>
    </template>
    <v-card
      max-width="300"
      max-height="400"
      class="overflow-y-auto scroll"
      id="card"
    >
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="item in 100"
            :key="item"
            :id="'songlist_' + Number(item - 1)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    isopen: false,
    selectedItem: 0,
  }),
  methods: {
    // 打开菜单后滚动定位
    openGoto() {
      setTimeout(() => {
        this.$vuetify.goTo("#songlist_" + this.selectedItem, {
          container: "#card",
          duration: 400,
          offset: -55,
          easing: "easeOutQuad",
        });
      }, 100);
    },
  },
};
</script>
