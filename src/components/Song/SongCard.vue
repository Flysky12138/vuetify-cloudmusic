<template>
  <v-card elevation="0" max-width="150">
    <v-img :src="value.coverImgUrl" @click="toPlaylist" class="mx-3 my-1 text-end rounded-lg" height="126" transition="fade-transition" width="126">
      <!-- 图片加载前显示 -->
      <template v-slot:placeholder>
        <v-row align="center" class="fill-height ma-0" justify="center">
          <v-progress-circular color="grey lighten-5" indeterminate></v-progress-circular>
        </v-row>
      </template>
      <!-- 默认插槽 -->
      <template v-slot:default>
        <v-chip class="ma-1 px-2 white--text" color="rgba(88, 89, 93, .45)" x-small>{{ theplayCount }}</v-chip>
      </template>
    </v-img>
    <v-card-text class="text-caption py-0" :title="value.name">{{ value.name }}</v-card-text>
  </v-card>
</template>

<script>
import playCount from '@/common/playCount'
export default {
  props: {
    // @params Object
    // coverImgUrl:String, playCount:Number ,name:String, id:Number
    value: { type: Object, required: true }
  },
  data: () => ({}),
  computed: {
    theplayCount() {
      return playCount(this.value.playCount)
    }
  },
  methods: {
    toPlaylist() {
      this.$router.push({
        path: '/playlist',
        query: {
          id: this.value.id
        }
      })
    }
  }
}
</script>
