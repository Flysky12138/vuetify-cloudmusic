import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const isDark = JSON.parse(localStorage.getItem("isDark"));

const opts = {
  theme: {
    dark: isDark
  },
  icons: {
    iconfont: "mdi"
  }
};

export default new Vuetify(opts);
