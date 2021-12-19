module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    port: 8888,
    proxy: {
      '/unapi': {
        target: 'https://unblock-netease-music-api.vercel.app/',
        changeOrigin: true,
        pathRewrite: {
          '/unapi': '/'
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        common: '@/common',
        components: '@/components',
        plugins: '@/plugins',
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
