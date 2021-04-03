import analyze from "rgbaster";

function color(params) {
  return String(255 - params);
}

function imgColor(params) {
  return new Promise((resolve, reject) => {
    analyze(params, {
      scale: 0.01,
      ignore: ["rgb(255,255,255)", "rgb(0,0,0)"]
    })
      .then(res => {
        const rgb = res[0].color.split(",");
        const r = Number(rgb[0].substring(4));
        const g = Number(rgb[1]);
        const b = Number(rgb[2].substring(0, rgb[2].length - 1));
        const unrgb = "rgb(" + color(r) + "," + color(g) + "," + color(b) + ")";
        resolve(unrgb);
      })
      .catch(() => reject("#FFFFFF"));
  });
}

export default imgColor;
