<template>
  <div>
    <!-- 音乐按键 -->
    <music-column />
    <!-- 回顶按键 -->
    <go-top />
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
