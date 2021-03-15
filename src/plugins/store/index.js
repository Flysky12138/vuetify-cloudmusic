import Vue from "vue";
import Vuex from "vuex";
import play from "./play";

Vue.use(Vuex);

const store = {
  modules: { play },
  state: {
    // 登录状态
    get islogin() {
      return localStorage.getItem("islogin") === "true";
    },
    set islogin(params) {
      localStorage.setItem("islogin", params);
    },
    // 用户信息
    get user() {
      return JSON.parse(localStorage.getItem("user"));
    },
    set user(params) {
      localStorage.setItem("user", JSON.stringify(params));
    }
  },
  mutations: {
    login(state, params) {
      state.islogin = true;
      state.user = {
        uid: params.uid,
        level: params.level,
        avatarUrl: params.avatarUrl
      };
    },
    logout(state) {
      state.islogin = false;
    }
  }
};

export default new Vuex.Store(store);
