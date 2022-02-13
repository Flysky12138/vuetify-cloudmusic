<template>
  <v-container>
    <!-- 歌单分类标签 -->
    <discover-catlist />
    <!-- 子路由 -->
    <keep-alive>
      <router-view :key='"discover" + $route.fullPath' />
    </keep-alive>
  </v-container>
</template>

<script>
import DiscoverCatlist from './components/DiscoverCatlist.vue'
export default {
  components: { DiscoverCatlist },
  data: () => ({})
}
</script>
