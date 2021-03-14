import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";
import goTo from "vuetify/es5/services/goto";
import message from "common/message";

// 解决报错问题：Error: Avoided redundant navigation to current location
const original = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  // 页面跳转浏览位置定位
  scrollBehavior: (to, from, savedPosition) => {
    // path不同才滚动
    if (to.path !== from.path) {
      let scrollTo = 0;
      if (to.hash) {
        scrollTo = to.hash;
      } else if (savedPosition) {
        scrollTo = savedPosition.y;
      }
      return goTo(scrollTo, {
        duration: 400,
        offset: 0,
        easing: "easeOutQuad"
      });
    }
  }
});

// 路由全局前置守卫
// 定义必须登录后才能访问的路由的名
let mustLogin = ["Recommend"];
router.beforeEach((to, from, next) => {
  if (mustLogin.includes(to.name)) {
    if (store.state.islogin) {
      next();
    } else {
      message({ text: "未登录，跳转到登录界面！" });
      location.hash = "/login";
    }
  } else {
    next();
  }
});

export default router;
