const state = {
  isplay: true, // 正在播放
  isShow: false, // 显示侧边音乐按键
  music: {
    id: 0, // ID
    listsIndex: 0, // 在lists数组中的位置
    dt: 0 // 播放进度
  },
  lists: [], // 默认播放列表ID
  loop: false, // 单曲循环播放
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
  muted: false
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
    state.music.id = state.random ? state.randomlists[0] : state.lists[0];
    state.music.listsIndex = 0;
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
    const index = (arr.indexOf(state.music.id) + arr.length - 1) % arr.length;
    state.music.id = arr[index];
    state.music.listsIndex = state.lists.indexOf(state.music.id);
  },
  // 下一首
  next(state) {
    const arr = state.random ? state.randomlists : state.lists;
    const index = (arr.indexOf(state.music.id) + 1) % arr.length;
    state.music.id = arr[index];
    state.music.listsIndex = state.lists.indexOf(state.music.id);
  },
  // 传入播放音乐的ID
  playMusicId(state, id) {
    state.music.id = id;
    state.music.listsIndex = state.lists.indexOf(id);
    state.music.dt = 0;
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
