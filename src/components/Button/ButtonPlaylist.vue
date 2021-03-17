<template>
  <v-menu
    offset-y
    top
    left
    nudge-top="10"
    :close-on-content-click="false"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-playlist-music</v-icon>
      </v-btn>
    </template>
    <v-card max-width="300" max-height="400" class="overflow-y-auto scroll">
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="item in 10">
            <v-list-item-content>
              <v-list-item-title> Two-line itemTwo-line </v-list-item-title>
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
    selectedItem: 1,
  }),
  methods: {},
};
</script>
