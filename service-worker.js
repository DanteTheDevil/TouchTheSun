const cacheName = 'TouchTheSun';

self.addEventListener('fetch', event => event.respondWith(
  caches.open(cacheName).then(cache =>
    cache.match(event.request).then(resp => {
      if (!!resp) {
        return resp;
      } else {
        if (!navigator.onLine){
          return new Response({status: 200});
        }
        return fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      }
    })
  ))
);
