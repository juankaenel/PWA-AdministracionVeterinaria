const nombreCache = 'apv-1';

// Archivos a cachear
const archivos = [
    '/',
    '/index.html',
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

    console.log(e);
})

// Registrar evento fetch para descargar archivos estáticos
self.addEventListener('fetch', e => {
    console.log('Fetch...', e);
})