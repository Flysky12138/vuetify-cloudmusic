import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = {
  state: {
    islogin: false,
    user: {
      uid: 0,
      level: 0,
      avatarUrl: ""
    },
    play: {
      isplay: false,
      lists: []
    }
  },
  mutations: {
    login(state, params) {
      state.islogin = true;
      state.user.uid = params.userId;
      state.user.level = params.level;
      state.user.avatarUrl = params.avatarUrl;
    },
    logout(state) {
      state.islogin = false;
    },
    isPlay(state, id) {
      // 单个ID就追加，多个就清空再赋值
      typeof id === "number"
        ? state.play.lists.push(id)
        : (state.play.lists = [...id]);
      state.play.isplay = true;
    },
    disPlay(state) {
      state.play.isplay = false;
    },
    clearLists(state) {
      state.play.lists = [];
    }
  }
};

export default new Vuex.Store(store);
