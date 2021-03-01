module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8888
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        views: "@/views"
      }
    }
  }
};
