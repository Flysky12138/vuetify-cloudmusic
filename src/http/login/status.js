import axios from "../api";

// 返回登录状态等信息
function status() {
  return axios.get("/login/status").then(response => {
    if (response.data.account === null) {
      return Promise.resolve({
        islogin: false
      });
    } else {
      return axios
        .get("/user/detail", {
          params: {
            uid: response.data.account.id
          }
        })
        .then(response => {
          return Promise.resolve({
            islogin: true,
            userId: response.profile.userId,
            level: response.level,
            avatarUrl: response.profile.avatarUrl
          });
        });
    }
  });
}
export default status;
