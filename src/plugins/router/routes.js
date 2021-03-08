const routes = [
  {
    path: "*",
    redirect: { name: "HelloWorld" }
  },
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
  },
  {
    path: "/playlist",
    name: "Playlist",
    component: () => import("views/Playlist")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("views/About")
  }
];

export default routes;
