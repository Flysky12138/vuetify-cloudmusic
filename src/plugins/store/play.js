import http from "@/http";

const state = {
  isplay: true, // 正在播放
  isShow: false, // 显示侧边音乐按键
  music: {}, // 正在播放音乐的信息
  dt: 0, // 播放进度
  lists: [], // 默认播放列表
  randomlists: [], // 随机播放列表
  random: false, // 随机播放
  loop: false, // 单曲循环播放
  // 音量 0-10
  get volume() {
    const data = JSON.parse(localStorage.getItem("volume"));
    return data !== null ? data : 10;
  },
  set volume(params) {
    localStorage.setItem("volume", JSON.stringify(params));
  },
  // 静音
  muted: false
};

const mutations = {
  // 添加歌曲信息到列表
  musicDetail(state, params) {
    state.lists = [...params];
    for (let i = 1; i < state.lists.length; i++) {
      const ran = Math.floor(Math.random() * (i + 1)); // [0,i]
      [state.randomlists[i], state.randomlists[ran]] = [
        state.lists[ran],
        state.lists[i]
      ];
    }
    state.music = state.random ? state.randomlists[0] : state.lists[0];
    state.isShow = true;
  },
  // 播放方式
  playmode(state, params) {
    switch (params) {
      case 0:
        state.loop = true;
        state.random = false;
        break;
      case 1:
        state.loop = false;
        state.random = false;
        break;
      case 2:
        state.loop = false;
        state.random = true;
        break;
    }
  },
  // 上一首
  previous(state) {
    const arr = state.random ? state.randomlists : state.lists;
    state.music = arr[(arr.indexOf(state.music) + arr.length - 1) % arr.length];
  },
  // 下一首
  next(state) {
    const arr = state.random ? state.randomlists : state.lists;
    state.music = arr[(arr.indexOf(state.music) + 1) % arr.length];
  },
  // 选择播放的音乐
  chooseMusicPlay(state, id) {
    state.music = state.lists.find(res => res.id === id);
  },
  // 移除音乐
  removeMusic(state, id) {
    id !== state.music.id &&
      state.lists.splice(
        state.lists.findIndex(res => res.id === id),
        1
      );
  },
  // 存放当前播放进度
  setPlayDt(state, params) {
    state.dt = params;
  },
  // 播放
  play(state) {
    setTimeout(() => {
      state.isplay = true;
    }, 100);
  },
  // 暂停
  pause(state) {
    setTimeout(() => {
      state.isplay = false;
    }, 100);
  },
  // 音量
  setVolume(state, params) {
    state.volume = params;
  },
  // 静音
  setMuted(state, params) {
    state.muted = params;
  }
};

const actions = {
  // 传入ID数组，获取歌曲信息
  addID({ commit }, ids) {
    state.isShow = false;
    http.song.detail(ids).then(res => {
      commit("musicDetail", res);
    });
  }
};

const getters = {
  indexMuiscInLists(state) {
    return state.lists.indexOf(state.music);
  }
};

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
};
