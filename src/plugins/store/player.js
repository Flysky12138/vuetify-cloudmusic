import http from '@/http'
import { defineStore } from 'pinia'

export const playerStore = defineStore('player', {
  state: () => ({
    isplay: true, // 正在播放
    isShow: false, // 显示侧边音乐按键
    music: {}, // 正在播放的音乐信息
    dt: 0, // 播放进度
    route: '', // 路由地址
    lists: [], // 默认播放列表
    randomlists: [], // 随机播放列表
    mode: 0, // 播放模式：单曲0、顺序1、随机2
    volume: 10, // 音量 0-10
    muted: false // 静音
  }),
  persist: {
    paths: ['mode', 'volume', 'muted'],
    overwrite: true
  },
  actions: {
    // 保存添加歌曲列表时的完整路由地址
    saveRoute(params) {
      this.route = params
    },
    // 添加稍后播放歌曲
    addID(id) {
      http.song.detail(id).then(res => {
        this.removeMusic(res[0].id)
        this.lists.splice(this.lists.findIndex(res => res === this.music) + 1, 0, ...res)
        this.randomlists.splice(this.randomlists.findIndex(res => res === this.music) + 1, 0, ...res)
      })
    },
    // 添加歌曲
    addIDs(ids) {
      this.isShow = false
      http.song.detail(ids).then(res => {
        this.lists = [...res]
        this.randomlists = [...res]
        // Fisher-Yates Shuffle 洗牌算法
        for (let i = 1; i < this.randomlists.length; i++) {
          const ran = Math.floor(Math.random() * (i + 1)) // [0,i]
          ;[this.randomlists[i], this.randomlists[ran]] = [this.randomlists[ran], this.randomlists[i]]
        }
        this.music = this.mode === 2 ? this.randomlists[0] : this.lists[0]
        this.isShow = true
      })
    },
    // 上一首
    previous() {
      const arr = this.mode === 2 ? this.randomlists : this.lists
      if (arr.length > 1) {
        this.music = arr[(arr.indexOf(this.music) + arr.length - 1) % arr.length]
      }
    },
    // 下一首
    next() {
      const arr = this.mode === 2 ? this.randomlists : this.lists
      if (arr.length > 1) {
        this.music = arr[(arr.indexOf(this.music) + 1) % arr.length]
      }
    },
    // 选择音乐
    chooseMusic(id) {
      this.music = this.lists.find(res => res.id === id)
    },
    // 移除音乐
    removeMusic(id) {
      const index = this.lists.findIndex(res => res.id === id)
      index !== -1 && this.lists.splice(index, 1)
      const _index = this.randomlists.findIndex(res => res.id === id)
      _index !== -1 && this.randomlists.splice(_index, 1)
    },
    // 存放播放进度
    setPlayDt(params) {
      this.dt = params
    },
    // 播放、暂停
    playORpause(params = 2) {
      if (Object.keys(this.music).length) {
        setTimeout(() => {
          switch (params) {
            case false:
              this.isplay = false
              break
            case true:
              this.isplay = true
              break
            default:
              this.isplay = !this.isplay
          }
        }, 100)
      }
    },
    // 播放模式
    playmode(params) {
      this.mode = params
    },
    // 音量
    setVolume(params) {
      this.volume = params
    },
    // 静音
    setMuted(params) {
      this.muted = params
    }
  },
  getters: {
    indexMusicInLists() {
      return this.lists.indexOf(this.music)
    }
  }
})
