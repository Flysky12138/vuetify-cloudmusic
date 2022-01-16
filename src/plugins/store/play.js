import http from '@/http'

const state = {
  isplay: true, // 正在播放
  isShow: false, // 显示侧边音乐按键
  music: {}, // 正在播放音乐的信息
  dt: 0, // 播放进度
  cache: 0, // 缓存进度 0-100（暂时只获取，没使用）
  route: '', // 路由地址
  lists: [], // 默认播放列表
  randomlists: [], // 随机播放列表
  // 播放模式：单曲0、顺序1、随机2
  get mode() {
    return JSON.parse(localStorage.getItem('mode'))
  },
  set mode(params) {
    localStorage.setItem('mode', JSON.stringify(params))
  },
  // 音量 0-10
  get volume() {
    const data = JSON.parse(localStorage.getItem('volume'))
    return data !== null ? data : 10
  },
  set volume(params) {
    localStorage.setItem('volume', JSON.stringify(params))
  },
  // 静音
  muted: false
}

const mutations = {
  // 保存音乐加载缓存进度
  saveCache(state, params) {
    state.cache = params
  },
  // 保存添加歌曲列表时的完整路由地址
  saveRoute(state, params) {
    state.route = params
  },
  // 添加歌曲
  addMusic(state, params) {
    state.lists = [...params]
    state.randomlists = [...params]
    // Fisher-Yates Shuffle 洗牌算法
    for (let i = 1; i < state.randomlists.length; i++) {
      const ran = Math.floor(Math.random() * (i + 1)) // [0,i]
      ;[state.randomlists[i], state.randomlists[ran]] = [state.randomlists[ran], state.randomlists[i]]
    }
    state.music = state.mode === 2 ? state.randomlists[0] : state.lists[0]
    state.isShow = true
  },
  // 添加稍后播放歌曲
  addLaterMusic(state, params) {
    this.commit('removeMusic', params[0].id)
    state.lists.splice(state.lists.findIndex(res => res === state.music) + 1, 0, ...params)
    state.randomlists.splice(state.randomlists.findIndex(res => res === state.music) + 1, 0, ...params)
  },
  // 播放方式
  playmode(state, params) {
    state.mode = params
  },
  // 上一首
  previous(state) {
    const arr = state.mode === 2 ? state.randomlists : state.lists
    if (arr.length > 1) {
      state.music = arr[(arr.indexOf(state.music) + arr.length - 1) % arr.length]
    }
  },
  // 下一首
  next(state) {
    const arr = state.mode === 2 ? state.randomlists : state.lists
    if (arr.length > 1) {
      state.music = arr[(arr.indexOf(state.music) + 1) % arr.length]
    }
  },
  // 选择播放的音乐
  chooseMusic(state, id) {
    state.music = state.lists.find(res => res.id === id)
  },
  // 移除音乐
  removeMusic(state, id) {
    const index = state.lists.findIndex(res => res.id === id)
    const _index = state.randomlists.findIndex(res => res.id === id)
    index !== -1 && state.lists.splice(index, 1)
    _index !== -1 && state.randomlists.splice(_index, 1)
  },
  // 存放当前播放进度
  setPlayDt(state, params) {
    state.dt = params
  },
  // 播放、暂停
  playORpause(state) {
    if (state.cache > 0) {
      setTimeout(() => {
        state.isplay = !state.isplay
      }, 100)
    }
  },
  // 音量
  setVolume(state, params) {
    state.volume = params
  },
  // 静音
  setMuted(state, params) {
    state.muted = params
  }
}

const actions = {
  // 传入ID数组，获取歌曲信息
  addID({ commit }, id) {
    http.song.detail(id).then(res => {
      commit('addLaterMusic', res)
    })
  },
  addIDs({ state, commit }, ids) {
    state.isShow = false
    http.song.detail(ids).then(res => {
      commit('addMusic', res)
    })
  }
}

const getters = {
  indexMusicInLists(state) {
    return state.lists.indexOf(state.music)
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  getters,
  actions
}
