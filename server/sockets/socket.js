
const { io } = require('../server');
const {Usuarios}  = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades.js');

const usuarios =  new Usuarios();


io.on('connection', (client) => {
    
    //console.log('Usuario conectado');

    client.on('entrarChat', (data, callback) => {

        if(!data.nombre){
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersona(client.id, data.nombre);

        client.broadcast.emit('listaPersonas', usuarios.getPersonas());

        callback(personas);
        
        //console.log(personas);
        
    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));

        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        //console.log('Se ha desconectado', personaBorrada);
        
    });
    
});