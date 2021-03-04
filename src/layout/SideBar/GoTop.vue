<template>
  <v-fab-transition>
    <v-btn
      fab
      dark
      color="blue lighten-2"
      v-scroll="onScroll"
      @click="$vuetify.goTo(target, options)"
      v-show="!isScrollTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data: () => ({
    isScrollTop: true,
  }),
  computed: {
    target() {
      return 0;
    },
    options() {
      return {
        duration: "400",
        offset: "0",
        easing: "easeOutQuad",
      };
    },
  },
  methods: {
    onScroll(e) {
      if (e.target.documentElement.scrollTop !== 0) {
        this.isScrollTop = false;
      } else {
        this.isScrollTop = true;
      }
    },
  },
};
</script>
