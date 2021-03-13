import store from "../store";
import http from "@/http";

const routes = [
  {
    path: "*",
    redirect: { name: "Home" }
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
          location.replace("/");
          // history.go(-1);
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
    path: "/discover/playlist",
    component: () => import("views/Discover")
  },
  {
    path: "/about",
    component: () => import("views/About")
  },
  {
    path: "/recommend",
    component: () => import("views/Recommend")
  }
];

export default routes;
