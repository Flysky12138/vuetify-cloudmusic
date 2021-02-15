import axios from "../../api";

// 检测手机号码是否已注册
function check(phone, countrycode = "86") {
    return axios.post("/cellphone/existence/check", {
        phone,
        countrycode
    });
}

export default check;
