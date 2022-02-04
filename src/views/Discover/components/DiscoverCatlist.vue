<template>
  <v-container>
    <v-expand-transition>
      <v-sheet v-show='isShow'>
        <discover-catlist-item v-for='item in value' :key='item.id' :head='item.sort' :items='item.names' />
        <div class='mb-6 px-4'>
          <v-divider></v-divider>
        </div>
      </v-sheet>
    </v-expand-transition>
    <v-row class='px-3' align='center'>
      <v-col>
        <span class='text-h6 font-weight-bold'>{{ cat }}</span>
      </v-col>
      <v-col cols='auto' class='pa-0 mx-auto'>
        <v-btn color='primary' icon @click='btnEvent' :disabled='value.length === 0'>
          <v-icon>{{ isShow ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-col>
      <v-col class='text-end'>
        <span class='text-subtitle-2 text--secondary font-weight-bold'>热门</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DiscoverCatlistItem from './DiscoverCatlistItem.vue'
export default {
  props: {
    cat: { type: String, required: true },
    value: { type: Array, required: true }
  },
  components: { DiscoverCatlistItem },
  data: () => ({
    isShow: false
  }),
  methods: {
    btnEvent() {
      this.isShow = !this.isShow
      // 滚动到页面顶部
      this.$vuetify.goTo(0, {
        duration: 500, // 动画时长
        offset: 0, // 偏移
        easing: 'easeOutQuad' // 动画
      })
    }
  }
}
</script>
