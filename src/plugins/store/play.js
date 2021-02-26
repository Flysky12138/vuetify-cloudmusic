const state = {
    isplay: false,
    lists: []
};

const mutations = {
    isPlay(state, id) {
        state.isplay = true;
        state.lists = id;
    },
    disPlay(state) {
        state.isplay = false;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
