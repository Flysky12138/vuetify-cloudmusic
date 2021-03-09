import store from "../store";
import http from "@/http";

const routes = [
  {
    path: "*",
    redirect: { name: "HelloWorld" }
  },
  {
    path: "/login",
    component: () => import("views/Login"),
    // 路由独享的守卫
    beforeEnter(to, from, next) {
      http.login.status().then(res => {
        if (res.islogin) {
          store.commit("tip", {
            text: "已经登录了！",
            color: "success"
          });
          history.go(-1);
        } else {
          next();
        }
      });
    }
  },
  {
    path: "/",
    component: () => import("views/HelloWorld")
  },
  {
    path: "/user",
    component: () => import("views/User")
  },
  {
    path: "/search",
    component: () => import("views/Search")
  },
  {
    path: "/playlist",
    component: () => import("views/Playlist")
  },
  {
    path: "/about",
    component: () => import("views/About")
  }
];

export default routes;
