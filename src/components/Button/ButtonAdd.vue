<template>
  <v-dialog v-model="dialog" width="400" content-class="scroll">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card max-height="400" class="overflow-y-auto scroll">
      <v-list>
        <v-list-item-group v-model="index">
          <v-list-item v-for="item in 10" :key="item" @click="addSong(item)">
            {{ item }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
  },
  data: () => ({
    dialog: false,
    index: 1,
  }),
  methods: {
    addSong(params) {
      this.dialog = false;
    },
  },
};
</script>
