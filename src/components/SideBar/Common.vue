<template>
  <div>
    <!-- 左上 -->
    <v-sheet class="l t" :style="offset">
      <slot name="lt"></slot>
    </v-sheet>
    <!-- 左中 -->
    <v-sheet class="l c" :style="offset">
      <slot name="lc"></slot>
    </v-sheet>
    <!-- 左下 -->
    <v-sheet class="l b" :style="offset">
      <slot name="lb"></slot>
    </v-sheet>
    <!-- 右上 -->
    <v-sheet class="r t" :style="offset">
      <slot name="rt"></slot>
    </v-sheet>
    <!-- 右中 -->
    <v-sheet class="r c" :style="offset">
      <slot name="rc"></slot>
    </v-sheet>
    <!-- 右下 -->
    <v-sheet class="r b" :style="offset">
      <slot name="rb"></slot>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    offsetX: {
      type: String,
      default: "0px",
    },
    offsetY: {
      type: String,
      default: "0px",
    },
  },
  data: () => ({}),
  computed: {
    offset() {
      return {
        "--offset-x": this.offsetX,
        "--offset-y": this.offsetY,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin common($item: column) {
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: $item;
  background-color: transparent !important;
}

.l {
  @include common;
  left: calc(5vw + var(--offset-x));
}

.r {
  @include common;
  right: calc(5vw + var(--offset-x));
}

.t {
  @include common;
  top: calc(10vh + var(--offset-y));
}

.b {
  @include common(column-reverse);
  bottom: calc(10vh + var(--offset-y));
}

.c {
  @include common;
  top: calc(50vh + var(--offset-y));
}
</style>
