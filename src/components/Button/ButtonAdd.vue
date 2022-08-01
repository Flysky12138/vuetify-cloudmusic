<template>
  <v-dialog :disabled="notHave" v-model="dialog" width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn :disabled="!islogin" @click="onClick" icon style="color: inherit" v-bind="attrs" v-on="on">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card class="overflow-y-auto scrollbar-hidden" max-height="400" rounded="lg">
      <template v-if="loading">
        <v-overlay>
          <v-progress-circular indeterminate size="64" width="10"></v-progress-circular>
        </v-overlay>
      </template>
      <template v-else>
        <v-list>
          <v-list-item :key="item.id" @click="addSong(item.id)" class="py-2" v-for="item in playlist">
            <v-img :src="item.coverImgUrl" class="mr-4 rounded-lg" max-width="60"></v-img>
            <div class="d-flex flex-column justify-space-between py-1" style="height: 60px">
              <div class="font-weight-bold text-truncate" style="max-width: 250px">{{ item.name }}</div>
              <div class="font-weight-bold text-subtitle-1">{{ item.trackCount }} 首</div>
            </div>
          </v-list-item>
        </v-list>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { userStore } from '@/plugins/store/user'
import { mapState } from 'pinia'
export default {
  props: {
    id: { type: Number, required: true },
    nolove: { type: Boolean, default: false }, // 不显示喜欢歌单
    notHave: { type: Boolean, default: false } // 歌曲没版权
  },
  data: () => ({
    dialog: false,
    loading: false, // 首次加载
    playlist: [] // 创建的歌单 {coverImgUrl:String, id:Number, name:String, playCount:Number}
  }),
  computed: {
    ...mapState(userStore, ['islogin', 'info'])
  },
  methods: {
    onClick() {
      this.notHave ? this.saveID() : this.getCreatePlaylist()
    },
    // 保存ID到本地
    saveID() {
      let ids = JSON.parse(localStorage.getItem('ids')) || []
      let [text, color] = ['歌曲已存在', 'error']
      if (!ids.includes(this.id)) {
        ids.unshift(this.id)
        localStorage.setItem('ids', JSON.stringify(ids))
        text = '歌曲已保存'
        color = 'success'
      }
      this.$message({
        text,
        color,
        button: {
          text: '查看',
          f: () => {
            this.$router.push('/temporary')
          }
        }
      })
    },
    // 获取用户创建的歌单
    getCreatePlaylist() {
      if (!JSON.parse(sessionStorage.getItem('userPlaylistsCached'))) {
        this.loading = true
      }
      this.$http.user.playlist(this.info.uid).then(res => {
        this.playlist = this.nolove ? res.create.filter(res => !/喜欢的音乐$/.test(res.name)) : res.create
        setTimeout(() => {
          this.loading = false
          sessionStorage.setItem('userPlaylistsCached', true)
        }, 600)
      })
    },
    // 向歌单添加歌曲
    addSong(params) {
      this.$http.playlist.tracks(params, this.id, true).then(() => {
        this.dialog = false
      })
    }
  }
}
</script>
