module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    port: 8888
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        views: '@/views'
      }
    }
  },
  pwa: {
    name: 'Vuetify CloudMusic',
    themeColor: '#ffffff',
    msTileColor: '#000000',
    manifestOptions: {
      display: 'standalone'
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin (GenerateSW or InjectManifest)
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js'
      // ...other Workbox options...
    }
  }
}
