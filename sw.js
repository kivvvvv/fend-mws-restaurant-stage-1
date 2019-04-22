const staticCacheName = "mws-restaurant-stage-1-cache1";

self.addEventListener("install", e => {
  let urlsToCache = [
    "/",
    "./restaurant.html",
    "./sw.js",
    "./css/styles.css",
    "./data/restaurants.json",
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
    "./js/dbhelper.js",
    "./js/main.js",
    "./js/restaurant_info.js"
  ];

  e.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => console.log(error))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      cacheNames
        .filter(function(cacheName) {
          return (
            cacheName.startsWith("mws-restaurant-stage-1") &&
            cacheName != staticCacheName
          );
        })
        .map(cacheName => caches.delete(cacheName));
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) return response;
      return fetch(e.request);
    })
  );
});
