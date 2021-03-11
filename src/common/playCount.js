function playCount(params) {
  if (params < 1e4) {
    return params;
  } else if (params < 1e8) {
    return (params / 1e4).toFixed(2) + "万";
  } else if (params < 1e12) {
    return (params / 1e8).toFixed(2) + "亿";
  }
}

export default playCount;
