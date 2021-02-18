const state = {
    account: {
        id: 0,
        createTime: 0,
        vipType: 0
    },
    profile: {
        avatarUrl: "",
        backgroundUrl: "",
        birthday: 0,
        city: 0,
        lastLoginIP: "",
        lastLoginTime: 0,
        nickname: "",
        signature: ""
    },
    messages: {
        number: 2
    }
};

const mutations = {
    userInformation(state, data) {
        for (let i in state.account) {
            state.account[i] = data.account[i];
        }
        for (let i in state.profile) {
            state.profile[i] = data.profile[i];
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
