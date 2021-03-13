import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

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

export default router;
