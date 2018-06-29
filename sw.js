var cachename = "currenco-v1";

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(cachename).then(function(cache){
            cache.addAll([
                "/",
                "/currenco/",
                "/currenco/index.html",
                "/currenco/partials/gsOne.html",
                "/currenco/partials/gsTwo.html",
                "/currenco/partials/gsThree.html",
                "/currenco/partials/gsFour.html",
                "/currenco/partials/beToBe.html",
                "/currenco/partials/currencies.html",
                "/currenco/partials/countries.html",
                "/currenco/css/main.css",
                "/currenco/js/db.js",
                "/currenco/js/html.js",
                "/currenco/js/api.js",
                "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js",
                "https://cdn.jsdelivr.net/npm/idb@2.1.3/lib/idb.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css",
                "https://fonts.googleapis.com/icon?family=Material+Icons",
                "/currenco/js/app.js",
                "/currenco/js/dynamic.js",
            ]);
        })
    );
});

self.addEventListener("active", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                   return cacheName.startsWith("currenco-") && cacheName != cachename;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener("fetch", function(event){
   event.respondWith(
       caches.match(event.request).then(function(response){
           console.log(response);
           return response || fetch(event.request).then(function(response) {
            return caches.open(cachename).then(function(cache) {
              cache.put(event.request, response.clone());
              return response;
            });
        });
       })
   );
});
