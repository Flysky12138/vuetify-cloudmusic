workbox.core.skipWaiting() // 强制等待中的 Service Worker 被激活
workbox.core.clientsClaim() // Service Worker 被激活后使其立即获得页面控制权
workbox.precaching.precacheAndRoute(self.__precacheManifest || []) // 设置预加载

/**
 * 设置资源缓存策略 workbox 主要提供了以下几种缓存策略
 * 1、Stale-While-Revalidate：使用缓存的内容（如果可用）尽快响应请求，如果未缓存，则使用网络请求。 然后，网络请求得到数据用于更新缓存。
 * 2、Cache First：如果请求命中缓存，则将使用缓存的响应来完成请求，不会使用网络。 如果没有命中缓存，将通过网络请求来获取数据，并且将数据缓存，以便下次直接从缓存获取数据。该模式可以为前端提供快速响应的同时，减轻服务器压力。但是数据的时效性就需要开发者通过设置缓存过期时间或更改service-work.js里面的修订标识来完成缓存文件的更新。
 * 3、Network First：优先从网络获取最新数据。 如果成功，它会将数据放入缓存。如果网络无法返回响应，则将使用缓存数据。
 * 4、Network Only：只使用网络请求数据。
 * 5、Cache Only：只使用缓存数据。
 */

workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css'
  })
)
workbox.routing.registerRoute(
  /.*\.js/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'js'
  })
)
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
)
