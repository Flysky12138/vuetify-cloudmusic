const state = {
    account: {},
    profile: {},
    messages: {
        number: 2
    }
};

const mutations = {
    userInformation(state, data) {
        state.account = data.account;
        state.profile = data.profile;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
