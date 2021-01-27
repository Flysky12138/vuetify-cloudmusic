<template>
  <v-sheet max-width="260">
    <v-text-field
      solo
      dense
      rounded
      hide-details
      placeholder="search"
      background-color="grey lighten-2"
      :flat="!isFocus"
      @focus="isFocus = true"
      @blur="
        isFocus = false;
        clear();
      "
      v-model="data"
    >
    </v-text-field>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    isFocus: false,
    data: "",
  }),
  methods: {
    clear() {
      this.data = "";
    },
  },
};
</script>
