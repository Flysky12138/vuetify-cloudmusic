import Vue from "vue";
import Vuex from "vuex";
import play from "./play";

Vue.use(Vuex);

const store = {
  modules: { play },
  state: {
    get islogin() {
      return localStorage.getItem("islogin") === "true";
    },
    set islogin(params) {
      localStorage.setItem("islogin", params);
    },
    get user() {
      return JSON.parse(localStorage.getItem("user"));
    },
    set user(params) {
      localStorage.setItem("user", params);
    },
    defaultApi: "https://music.api.flysky.xyz"
  },
  mutations: {
    login(state, params) {
      state.islogin = true;
      // image2Base64
      let img = new Image();
      img.src = params.avatarUrl;
      img.setAttribute("crossOrigin", "Anonymous");
      img.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
        let base64 = canvas.toDataURL("image/png");
        // 保存用户信息
        state.user = JSON.stringify({
          uid: params.uid,
          level: params.level,
          avatarUrl: base64
        });
      };
    },
    logout(state) {
      state.islogin = false;
    }
  }
};

export default new Vuex.Store(store);
