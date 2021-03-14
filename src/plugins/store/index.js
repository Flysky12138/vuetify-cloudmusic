import Vue from "vue";
import Vuex from "vuex";
import play from "./play";

Vue.use(Vuex);

const store = {
  modules: { play },
  state: {
    islogin: false,
    user: {
      uid: 0,
      level: 0,
      avatarUrl: ""
    },
    defaultApi: "https://music.api.flysky.xyz"
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
    }
  }
};

export default new Vuex.Store(store);
