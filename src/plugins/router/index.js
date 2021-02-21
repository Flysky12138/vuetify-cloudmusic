import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "HelloWorld",
        component: () => import("views/HelloWorld.vue")
    },
    {
        path: "/account",
        name: "Account",
        component: () => import("views/Account.vue")
    }
];

export default new VueRouter({
    routes
});
