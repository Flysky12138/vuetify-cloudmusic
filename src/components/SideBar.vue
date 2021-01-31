<template>
  <div>
    <!-- 音乐按键栏 -->
    <music-column />
    <!-- 回顶按键 -->
    <go-top />
  </div>
</template>

<script>
import MusicColumn from "./SideBar/MusicColumn.vue";
import GoTop from "./SideBar/GoTop.vue";
export default {
  components: { MusicColumn, GoTop },
  data: () => ({}),
};
</script>
