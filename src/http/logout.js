import axios from "./api";

// 退出登录
function logout() {
  return axios.get("/logout");
}

export default logout;
