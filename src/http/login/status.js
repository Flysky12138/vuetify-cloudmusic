import axios from "../api";

// 登录状态
function status() {
    return axios.get("/login/status").then(response => {
        if (response.data.account === null && response.data.profile === null) {
            return Promise.resolve({
                islogin: false,
                id: 0
            });
        } else {
            return Promise.resolve({
                islogin: true,
                id: response.data.account.id
            });
        }
    });
}
export default status;
