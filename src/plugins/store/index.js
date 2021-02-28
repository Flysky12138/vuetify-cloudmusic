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
        isPlay(state, idArray) {
            state.play.isplay = true;
            state.play.lists = idArray;
        },
        disPlay(state) {
            state.play.isplay = false;
        }
    }
};

export default new Vuex.Store(store);
