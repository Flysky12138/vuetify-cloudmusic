<template>
  <div>
    <!-- 左上 -->
    <v-sheet class="left top" :style="offset">
      <slot name="lt"></slot>
    </v-sheet>
    <!-- 左下 -->
    <v-sheet class="left bottom" :style="offset">
      <slot name="lb"></slot>
    </v-sheet>
    <!-- 右上 -->
    <v-sheet class="right top" :style="offset">
      <slot name="rt"></slot>
    </v-sheet>
    <!-- 右下 -->
    <v-sheet class="right bottom" :style="offset">
      <slot name="rb"></slot>
    </v-sheet>
    <!-- 上中 -->
    <v-sheet class="top x" :style="offset">
      <slot name="t"></slot>
    </v-sheet>
    <!-- 右中 -->
    <v-sheet class="right y" :style="offset">
      <slot name="r"></slot>
    </v-sheet>
    <!-- 下中 -->
    <v-sheet class="bottom x" :style="offset">
      <slot name="b"></slot>
    </v-sheet>
    <!-- 左中 -->
    <v-sheet class="left y" :style="offset">
      <slot name="l"></slot>
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

.left {
  @include common;
  left: calc(5vw + var(--offset-x));
}

.right {
  @include common;
  right: calc(5vw + var(--offset-x));
}

.top {
  @include common;
  top: calc(10vh + var(--offset-y));
}

.bottom {
  @include common(column-reverse);
  bottom: calc(10vh + var(--offset-y));
}

.x {
  @include common(row);
  left: calc(50vw + var(--offset-x));
}

.y {
  @include common;
  top: calc(50vh + var(--offset-y));
}
</style>
