import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";
import http from "@/http";

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
    if (to.path !== from.path) {
      return { x: 0, y: 0 };
    }
  }
});

// 路由全局前置守卫
// 定义必须登录的路由名
let mustLogin = ["Recommend"];
router.beforeEach((to, from, next) => {
  if (mustLogin.includes(to.name)) {
    http.login.status().then(res => {
      if (res.islogin) {
        next();
      } else {
        store.commit("tip", "未登录，跳转到登录界面！");
        location.hash = "/login";
      }
    });
  } else {
    next();
  }
});

export default router;
