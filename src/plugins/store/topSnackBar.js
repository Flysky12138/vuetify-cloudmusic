const state = {
  text: "",
  color: "",
  timeout: -1
};

const mutations = {
  topText(state, params = { text, color: "error", timeout: "3000" }) {
    if (typeof params === "object") {
      state.text = params.text;
      state.color = params.color;
      state.timeout = params.timeout;
    } else {
      state.text = params;
      state.color = "error";
      state.timeout = "3000";
    }
  }
};

export default {
  namespaced: false,
  state,
  mutations
};
