var CACHE_NAME = 'my-site-cache-2017-10-27-18-22';

var urlsToCache = [
    '/',
    '/style.css'
];

self.addEventListener('install', function(event) {
    // インストール処理
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                // キャッシュがあったのでそのレスポンスを返す
                if (response) {
                    console.log('キャッシュあった');
                    return response;
                } else {
                    console.log('キャッシュなかった');
                }

                return fetch(event.request);
            })
    );
});
