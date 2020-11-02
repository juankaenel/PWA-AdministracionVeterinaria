const nombreCache = 'apv-4';

// Archivos a cachear
const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js',
];

// Instalar el service worker, este método se ejecuta una vez, para volver a ejecutarlo hay que unregistrarlo. -> es donde se hace el cacheado de archivos
self.addEventListener('install', e => {
    console.log('Instalando el Service Worker');

    // Esperar hasta que se hayan descargado todo el caché
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('cacheando..');
                cache.addAll(archivos);
            })
    )
})

// Activar el Service Worker
self.addEventListener('activate', e => {
    console.log('Service Worker Activado');

    e.waitUntil(
        caches.keys() // Los keys hacen referencia a las distintas versiones de caché, apv-1,apv-2
            .then(keys => {
                console.log(keys);
                return Promise.all(
                    keys.filter(key => key !== nombreCache ) // Filtra los que sean distinto al nombre del caché
                        .map(key => caches.delete(key)) // Elimina los demás versiones que no se usan
                )

            })
    )
})

// Registrar evento fetch para descargar archivos estáticos ( Cacheado )
self.addEventListener('fetch', e => {
    console.log('Fetch', e)
    // Dale esta respuesta una vez que hagamos el fetch
    e.respondWith(
    caches
        .match(e.request)
        .then(cacheResponse => (cacheResponse ? cacheResponse : caches.match('error.html')))
    )
})