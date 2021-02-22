import Vue from "vue";
import Vuex from "vuex";

import play from "./play";
import user from "./user";

Vue.use(Vuex);

const store = {
    state: {
        islogin: false
    },
    mutations: {
        isLogin(state, params) {
            state.islogin = params;
        }
    },
    modules: {
        play,
        user
    }
};

export default new Vuex.Store(store);
