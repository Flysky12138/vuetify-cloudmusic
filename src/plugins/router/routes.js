import store from "../store";
import http from "@/http";

const routes = [
  {
    path: "*",
    redirect: { name: "Home" }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("views/Login"),
    // 路由独享的守卫
    beforeEnter(to, from, next) {
      http.login.status().then(res => {
        if (res.islogin) {
          store.commit("tip", {
            text: "已经登录了！",
            color: "success"
          });
          history.back();
        } else {
          next();
        }
      });
    }
  },
  {
    path: "/",
    name: "Home",
    component: () => import("views/Home")
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
  },
  {
    path: "/playlist",
    name: "Playlist",
    component: () => import("views/Playlist")
  },
  {
    path: "/discover/playlist",
    name: "Discover",
    component: () => import("views/Discover")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("views/About")
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: () => import("views/Recommend")
  }
];

export default routes;
