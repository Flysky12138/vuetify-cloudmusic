import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/es5/services/goto";
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
    let scrollTo = 0; // 默认回顶
    if (to.hash) {
      scrollTo = to.hash; // 路由跳转时可指定该值，进行新页面定位
    } else if (savedPosition) {
      // scrollTo = savedPosition.y; // 由浏览器的后退/前进按钮触发
    }
    setTimeout(() => {
      return goTo(scrollTo, {
        duration: "400", // 动画时长
        offset: "0", // 偏移
        easing: "easeOutQuad" // 动画
      });
    }, 100);
  }
});

export default router;
