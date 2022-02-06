module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    port: 8888
  },
  pwa: {
    name: 'Vuetify CloudMusic',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    manifestOptions: {
      display: 'standalone',
      background_color: '#ffffff',
      description: '网易云音乐第三方Web播放器'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  }
}
