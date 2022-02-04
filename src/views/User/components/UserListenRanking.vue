<template>
  <v-card elevation='1' rounded='lg' class='overflow-hidden'>
    <song-list :value='value' :disColumn='[3]' :itemsPerPage='value.length' :loading='loading'>
      <template #top>
        <v-row>
          <!-- 标题 -->
          <v-col cols='6' class='d-flex align-end'>
            <v-card-title class='pa-0 mx-4'>听歌排行</v-card-title>
            <v-card-subtitle class='pa-0 pb-1'>实际播放时间过短的歌曲将不纳入计算</v-card-subtitle>
          </v-col>
          <v-col>
            <!-- 选项卡 -->
            <v-tabs v-model='tab' @change='$emit("change", tab)' right>
              <v-tab>所有时间</v-tab>
              <v-tab>最近一周</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>
    </song-list>
  </v-card>
</template>

<script>
import SongList from '@/components/Song/SongList.vue'
export default {
  components: { SongList },
  props: {
    value: { type: Array, required: true },
    loading: { type: Boolean, default: false, required: true }
  },
  data: () => ({
    tab: 1
  })
}
</script>
