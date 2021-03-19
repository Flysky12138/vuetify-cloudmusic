const state = {
  isplay: false, // 播放
  // 当前播放的歌曲
  music: {
    id: 0,
    dt: 0
  },
  lists: [], // 默认播放列表ID
  random: false, // 随机播放
  randomlists: [] // 随机播放列表ID
};

const mutations = {
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
    state.isplay = true;
  },
  // 上一首
  previous(state) {
    const current = state.lists.indexOf(state.music.id);
    state.music.id =
      current === 0
        ? state.lists[state.lists.length - 1]
        : state.lists[current - 1];
  },
  // 下一首
  next(state) {
    const current = state.lists.indexOf(state.music.id);
    state.music.id = state.lists[(current + 1) % state.lists.length];
  },
  // 存放当前播放时间
  setPlayDt(state, params) {
    state.music.dt = params;
  }
};

export default {
  namespaced: false,
  state,
  mutations
};
