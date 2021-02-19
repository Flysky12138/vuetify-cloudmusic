import axios from "../api";

// 二维码key生成接口
function key() {
    return axios.get("/login/qr/key").then(res => {
        return Promise.resolve(res.data.unikey);
    });
}
// 二维码生成接口
function create(key) {
    return axios
        .get("/login/qr/create", {
            params: {
                key,
                qrimg: true
            }
        })
        .then(res => {
            return Promise.resolve(res.data.qrimg);
        });
}
// 二维码检测扫码状态接口
function check(key) {
    return axios
        .get("/login/qr/check", {
            params: {
                key
            }
        })
        .then(res => {
            let code = 1;
            switch (res.code) {
                case 800: // 二维码过期
                    code = 0;
                    break;
                case 801: // 等待扫码
                    code = 1;
                    break;
                case 802: // 待确认
                    code = 2;
                    break;
                case 803: // 授权成功
                    code = 3;
                    break;
            }
            return Promise.resolve(code);
        });
}

export default {
    key,
    create,
    check
};
