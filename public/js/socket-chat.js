
var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp){
        console.log('Usuarios conectados', resp);
        
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Se ha perdido la conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Antonio',
//     mensaje: 'Hey There Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cuando usuarios entran o salen
socket.on('listaPersonas', function(personas){
    console.log(personas);
    
});