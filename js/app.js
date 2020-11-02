// Registro de service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(registrado => console.log('Se instalo correctamente',registrado))
    .catch(error=>console.log('Service worker no registrador debido a ', error))
}
else{
    console.log('Service workers no soportado')
}
