function date(timestamp) {
    const date = new Date(timestamp);
    const Y = date.getFullYear();
    const M =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    const D = date.getDate();
    const h = date.getHours();
    const m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const s = date.getSeconds();
    return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s; // 输出结果：2021-02-20 17:01:15
}

export default date;
