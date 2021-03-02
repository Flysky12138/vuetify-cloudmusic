import Vue from "vue";
import VueRouter from "vue-router";

// 解决报错问题：Error: Avoided redundant navigation to current location
const original = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("views/Login")
  },
  {
    path: "/",
    name: "HelloWorld",
    component: () => import("views/HelloWorld")
  },
  {
    path: "/user",
    name: "User",
    component: () => import("views/User")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("views/Search")
  }
];

const router = new VueRouter({
  routes
});

export default router;
