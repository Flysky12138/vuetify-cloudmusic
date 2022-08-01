<template>
  <v-container>
    <!-- 歌单分类标签 -->
    <discover-catlist />
    <!-- 子路由 -->
    <keep-alive>
      <router-view :key="$route.fullPath" v-if="$route.path.includes('/discover')" />
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
