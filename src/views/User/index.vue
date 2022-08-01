<template>
  <v-container>
    <!-- 获取数据前骨架图 -->
    <skeleton-loader v-if="count != 2" />
    <v-row class="pa-3" v-else>
      <!-- 个人信息 -->
      <v-col cols="12" class="py-10 px-7">
        <user-detail :value="userDetail" />
      </v-col>
      <!-- 歌单 -->
      <v-col cols="12" v-if="!!userPlaylist.create.length">
        <user-playlist :value="userPlaylist.create" title="创建的歌单" />
      </v-col>
      <v-col cols="12" v-if="!!userPlaylist.collect.length">
        <user-playlist :value="userPlaylist.collect" title="收藏的歌单" />
      </v-col>
      <!-- 听歌排行 -->
      <v-col cols="12" v-if="userListenRanking.isShow" class="userListenRanking">
        <user-listen-ranking :value="userListenRanking.items" :loading="userListenRanking.loading" @change="getUserListenRanking" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SkeletonLoader from './components/SkeletonLoader.vue'
import UserDetail from './components/UserDetail.vue'
import UserPlaylist from './components/UserPlaylist.vue'
import UserListenRanking from './components/UserListenRanking.vue'
export default {
  components: { SkeletonLoader, UserDetail, UserPlaylist, UserListenRanking },
  data: () => ({
    count: 0,
    uid: 0,
    userDetail: {
      level: 0,
      createDays: 0,
      listenSongs: 0,
      profile: {
        avatarUrl: '',
        birthday: '',
        city: '',
        followeds: 0,
        follows: 0,
        gender: 0,
        nickname: '',
        province: '',
        signature: ''
      }
    },
    userPlaylist: {
      create: [],
      collect: []
    },
    userListenRanking: {
      isShow: false,
      items: [],
      loading: false
    }
  }),
  created() {
    this.uid = this.$route.query.uid
    this.getUserDetail()
    this.getUserPlaylist()
    this.getUserListenRanking()
  },
  methods: {
    // 获取用户信息
    getUserDetail() {
      this.$http.user.detail(this.uid).then(res => {
        Object.assign(this.userDetail, res)
        this.count++
      })
    },
    // 获取用户歌单
    getUserPlaylist() {
      this.$http.user.playlist(this.uid).then(res => {
        this.userPlaylist.create = res.create
        this.userPlaylist.collect = res.collect
        this.count++
      })
    },
    // 获取用户听歌排行
    getUserListenRanking(params = 1) {
      this.userListenRanking.loading = true
      this.$http.user.record(this.uid, params).then(res => {
        this.userListenRanking.isShow = true
        this.userListenRanking.items = res
        this.userListenRanking.loading = false
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.uid = to.query.uid
    this.count = 0
    this.getUserDetail()
    this.getUserPlaylist()
    this.getUserListenRanking()
    next()
  }
}
</script>
