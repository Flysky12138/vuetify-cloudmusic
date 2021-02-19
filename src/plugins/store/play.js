const state = {
    isPlay: false
};

const mutations = {
    isPlay(state) {
        state.isPlay = true;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
