
const { io } = require('../server');


io.on('connection', (client) => {
    
    console.log('Usuario conectado');

    // Enviar Mensaje al cliente
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    } );

    client.on('disconnect', () => {
        
        console.log('Usuario desconectado');
        
    });

    // Escuchar cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log( nTicket );
        
        client.broadcast.emit('enviarMensaje', data);

        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }

    });
    
});