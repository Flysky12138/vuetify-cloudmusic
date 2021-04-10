// 设置缓存的前缀和后缀
workbox.core.setCacheNameDetails({
  prefix: "com.vuetify.cloudmusic",
  suffix: "v0.1.0"
});
// 强制等待中的 Service Worker 被激活
workbox.core.skipWaiting();
// Service Worker 被激活后使其立即获得页面控制权
workbox.core.clientsClaim();
// 设置预加载
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

/*
 * 设置资源缓存策略 workbox主要提供了以下几种缓存策略
 * 1、Stale-While-Revalidate：使用缓存的内容（如果可用）尽快响应请求，如果未缓存，则使用网络请求。 然后，网络请求得到数据用于更新缓存。
 * 2、Cache First：如果请求命中缓存，则将使用缓存的响应来完成请求，不会使用网络。 如果没有命中缓存，将通过网络请求来获取数据，并且将数据缓存，以便下次直接从缓存获取数据。该模式可以为前端提供快速响应的同时，减轻服务器压力。但是数据的时效性就需要开发者通过设置缓存过期时间或更改service-work.js里面的修订标识来完成缓存文件的更新。
 * 3、Network First：优先从网络获取最新数据。 如果成功，它会将数据放入缓存。如果网络无法返回响应，则将使用缓存数据。
 * 4、Network Only：只使用网络请求数据。
 * 5、Cache Only：只使用缓存数据。
 */

//缓存web的css资源
workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // 使用缓存，但尽快在后台更新
  workbox.strategies.staleWhileRevalidate({
    // 使用自定义缓存名称
    cacheName: "css-cache"
  })
);

// 缓存web的js资源
workbox.routing.registerRoute(
  // 缓存JS文件
  /.*\.js/,
  // 使用缓存，但尽快在后台更新
  workbox.strategies.staleWhileRevalidate({
    // 使用自定义缓存名称
    cacheName: "js-cache"
  })
);

// 缓存web的图片资源
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 设置缓存有效期为30天
      })
    ]
  })
);

// 缓存其他域名上的图片资源，需要支持跨域
// workbox.routing.registerRoute(
//   /^http(s)?:\/\/.+\.(jpe?g|png|gif|svg)$/,
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: "cloudmusic-images",
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 5 * 24 * 60 * 60 // 设置缓存有效期为5天
//       })
//     ],
//     fetchOptions: {
//       credentials: "include" // 支持跨域
//     }
//   })
// );

// 缓存get api请求的数据
// workbox.routing.registerRoute(
//   new RegExp("https://m.my.com/api"),
//   workbox.strategies.networkFirst({
//     cacheName: "api"
//   })
// );

// 缓存post api请求的数据
// const bgSyncPlugin = new workbox.backgroundSync.Plugin('apiQueue', {
//   maxRetentionTime: 1 * 60
// });
// workbox.routing.registerRoute(
//   /.*\/api\/.*/,
//   new workbox.strategies.networkOnly({
//     plugins: [bgSyncPlugin]
//   }),
//   'POST'
// );
