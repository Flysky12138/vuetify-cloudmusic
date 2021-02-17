import cellphone from "./login/cellphone";
import _qr from "./login/qr";
import check from "./cellphone/existence/check";

export default {
    cellphone,
    qr: {
        key: _qr.key,
        create: _qr.create,
        check: _qr.check
    },
    check
};
