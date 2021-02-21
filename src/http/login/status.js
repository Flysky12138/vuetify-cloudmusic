import axios from "../api";

// 登录状态
function status() {
    return axios.get("/login/status").then(response => {
        if (response.data.account === null && response.data.profile === null) {
            return Promise.resolve(false);
        } else {
            return Promise.resolve(true);
        }
    });
}
export default status;
