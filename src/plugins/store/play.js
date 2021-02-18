const state = {
    isPlay: false
};

const mutations = {
    onPlay(state) {
        state.isPlay = true;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
