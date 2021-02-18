import Vue from "vue";
import Vuex from "vuex";

import play from "./play";
import user from "./user";

Vue.use(Vuex);

const opts = {
    state: {
        isLogin: false
    },
    mutations: {
        isLogin(state, data) {
            state.isLogin = data;
        }
    },
    modules: {
        play,
        user
    }
};

export default new Vuex.Store(opts);
