const state = {
  isplay: false,
  lists: []
};

const mutations = {
  isPlay(state, id) {
    // 单个ID就追加，多个就清空再赋值
    typeof id === "number" ? state.lists.push(id) : (state.lists = [...id]);
    state.isplay = true;
  },
  disPlay(state) {
    state.isplay = false;
  },
  clearLists(state) {
    state.lists = [];
  }
};

export default {
  namespaced: false,
  state,
  mutations
};
