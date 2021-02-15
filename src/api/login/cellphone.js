import axios from "../api";

// 手机登录
function cellphone(phone, password) {
    return axios.get("/login/cellphone", {
        params: {
            phone,
            password
        }
    });
}

export default cellphone;
