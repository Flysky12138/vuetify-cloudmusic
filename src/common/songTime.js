function songTime(params) {
    let m = Math.floor(params / 1000 / 60);
    m = m < 10 ? "0" + m : m;
    let s = Math.floor(params / 1000 - m * 60);
    s = s < 10 ? "0" + s : s;
    return m + ":" + s;
}

export default songTime;
