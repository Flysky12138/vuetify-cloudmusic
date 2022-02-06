<template>
  <v-btn icon @click='love' :disabled='!islogin'>
    <v-icon v-if='islove' color='red'>mdi-heart</v-icon>
    <v-icon v-else>mdi-heart-plus</v-icon>
  </v-btn>
</template>

<script>
import { userStore } from '@/plugins/store/user'
import { mapState } from 'pinia'
export default {
  props: {
    id: { type: Number, required: true }
  },
  data: () => ({
    islove: false
  }),
  created() {
    this.isLove()
  },
  watch: {
    id: 'isLove'
  },
  computed: {
    ...mapState(userStore, ['islogin', 'info'])
  },
  methods: {
    // 是否已添加喜欢音乐列表
    isLove() {
      this.islove = false
      this.$http.song.likelist(this.info.uid).then(res => {
        this.islove = res.indexOf(this.id) === -1 ? false : true
      })
    },
    // 从喜欢音乐列表添加、移除
    love() {
      this.$http.song.like(this.id, !this.islove).then(res => {
        this.islove = !this.islove
        if (res.code !== 200) {
          setTimeout(() => {
            this.islove = !this.islove
          }, 1000)
        }
      })
    }
  }
}
</script>
