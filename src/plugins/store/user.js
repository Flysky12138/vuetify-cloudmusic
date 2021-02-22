const state = {
    // detail
    createDays: 0,
    createTime: 0,
    level: 0,
    listenSongs: 0,
    profile: {
        avatarUrl: "",
        backgroundUrl: "",
        birthday: 0,
        city: 0,
        gender: 0,
        nickname: "",
        playlistCount: 0,
        province: 0,
        signature: "",
        userId: 0,
        vipType: 0
    },

    newsAmount: 10
};

const mutations = {
    detail(state, params) {
        state.createDays = params.createDays;
        state.createTime = params.createTime;
        state.level = params.level;
        state.listenSongs = params.listenSongs;
        for (let i in state.profile) {
            state.profile[i] = params.profile[i];
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
