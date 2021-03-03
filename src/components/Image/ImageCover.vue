<template>
  <v-dialog v-model="dialog" max-width="90vmin" overlay-opacity="0.8">
    <template v-slot:activator="{ on, attrs }">
      <v-img
        v-bind="attrs"
        v-on="on"
        :src="src"
        :width="size"
        :height="size"
        transition="fade-transition"
        style="border-radius: 12px; box-shadow: #80d8ff 0 0 5px"
      ></v-img>
    </template>
    <v-img :src="src"></v-img>
  </v-dialog>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    size: { type: Number, default: 140 },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
