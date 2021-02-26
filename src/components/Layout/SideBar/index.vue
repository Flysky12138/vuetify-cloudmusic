<template>
  <div>
    <!-- 音乐按键 -->
    <div class="right" style="top: 45vh">
      <music-column />
    </div>
    <!-- 回顶按键 -->
    <div class="right bottom">
      <go-top />
    </div>
  </div>
</template>

<script>
import MusicColumn from "./MusicColumn.vue";
import GoTop from "./GoTop.vue";
export default {
  components: { MusicColumn, GoTop },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
@mixin common($item: column) {
  position: fixed;
  display: flex;
  flex-direction: $item;
  align-items: center;
  background-color: transparent !important;
}

.left {
  @include common;
  left: 5vw;
}

.right {
  @include common;
  right: 5vw;
}

.top {
  @include common;
  top: 10vh;
}

.bottom {
  @include common(column-reverse);
  bottom: 10vh;
}
</style>
