const cacheName = 'TouchTheSun';

self.addEventListener('install', () => {

});

self.addEventListener('activate', () => {

});


const cachedFetch = request => request.method !== 'GET' ?
  // we can only cache GET requests
  fetch(request) :
  caches.open(cacheName).then(cache =>
    cache.match(request).then(resp => {
      if (!!resp) {
        return resp;
      } else {
        return fetch(request).then(response => {
          // put the new response in the cache for next fetches
          cache.put(request, response.clone());
          return response;
        });
      }
    })
  );

self.addEventListener('fetch', event => event.respondWith(
  cachedFetch(event.request))
);
