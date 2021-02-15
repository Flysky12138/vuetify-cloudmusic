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
        path: "/login",
        name: "Login",
        component: () => import("views/Login")
    },
    {
        path: "/user",
        name: "User",
        component: () => import("views/User.vue")
    }
];

export default new VueRouter({
    routes
});
