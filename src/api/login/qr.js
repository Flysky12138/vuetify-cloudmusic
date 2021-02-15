import axios from "../api";

// 二维码key生成接口
function key() {
    return axios.get("/login/qr/key");
}
// 二维码生成接口
function create(key) {
    return axios.get("/login/qr/create", {
        params: {
            key,
            qrimg: true,
            timerstamp: new Date().getTime()
        }
    });
}
/* 二维码检测扫码状态接口
 * 说明: 轮询此接口可获取二维码扫码状态
 * 800为二维码过期
 * 801为等待扫码
 * 802为待确认
 * 803为授权登录成功(803状态码下会返回cookies)
 */
function check(key) {
    return axios.get("/login/qr/check", {
        params: {
            key,
            timerstamp: new Date().getTime()
        }
    });
}

export default {
    key,
    create,
    check
};
