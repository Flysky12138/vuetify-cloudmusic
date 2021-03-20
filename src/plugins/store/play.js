const state = {
  isplay: false, // 正在播放
  isShow: false, // 显示侧边音乐按键
  music: {
    id: 0, // ID
    dt: 0 // 播放进度
  },
  lists: [], // 默认播放列表ID
  random: false, // 随机播放
  randomlists: [], // 随机播放列表ID
  // 音量
  get volume() {
    const data = JSON.parse(localStorage.getItem("volume"));
    return data !== null ? data : 50;
  },
  set volume(params) {
    localStorage.setItem("volume", JSON.stringify(params));
  },
  // 静音
  get muted() {
    const data = JSON.parse(localStorage.getItem("muted"));
    return data ? true : false;
  },
  set muted(params) {
    localStorage.setItem("muted", JSON.stringify(params));
  }
};

const mutations = {
  // 添加歌曲到列表
  addPlay(state, id) {
    state.lists = [];
    // lists 赋值
    state.lists = typeof id === "number" ? [id] : [...id];
    // randomlists 赋值
    for (let i = 1; i < state.lists.length; i++) {
      const ran = Math.floor(Math.random() * (i + 1));
      [state.randomlists[i], state.randomlists[ran]] = [
        state.lists[ran],
        state.lists[i]
      ];
    }
    state.music.id = state.lists[0];
    state.isShow = true;
  },
  // 上一首
  previous(state) {
    if (state.random) {
      let index = state.randomlists.indexOf(state.music.id);
      index = (index + state.randomlists.length - 1) % state.randomlists.length;
      state.music.id = state.randomlists[index];
    } else {
      let index = state.lists.indexOf(state.music.id);
      index = (index + state.lists.length - 1) % state.lists.length;
      state.music.id = state.lists[index];
    }
  },
  // 下一首
  next(state) {
    if (state.random) {
      let index = state.randomlists.indexOf(state.music.id);
      index = (index + 1) % state.randomlists.length;
      state.music.id = state.randomlists[index];
    } else {
      let index = state.lists.indexOf(state.music.id);
      index = (index + 1) % state.lists.length;
      state.music.id = state.lists[index];
    }
  },
  // 存放当前播放进度
  setPlayDt(state, params) {
    state.music.dt = params;
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

export default {
  namespaced: false,
  state,
  mutations
};
