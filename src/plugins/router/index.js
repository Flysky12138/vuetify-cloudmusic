import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "HelloWorld",
        component: () => import("views/HelloWorld")
    },
    {
        path: "/account",
        name: "Account",
        component: () => import("views/Account")
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

/*
 * 解决报错问题：报错显示是路由重复
 * Error: Avoided redundant navigation to current location
 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

export default router;
