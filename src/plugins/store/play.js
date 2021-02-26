const state = {
    isPlay: false,
    lists: []
};

const mutations = {
    isPlay(state, id) {
        state.isPlay = true;
        state.lists = id;
    },
    disPlay(state) {
        state.isPlay = false;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
