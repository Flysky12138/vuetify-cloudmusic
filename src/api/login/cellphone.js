import axios from "../api";

// 手机登录
function cellphone(phone, password, countrycode = "86") {
    return axios.post("/login/cellphone", {
        phone,
        password,
        countrycode
    });
}

export default cellphone;
