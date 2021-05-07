const Usuario  = require('../db/models').Usuario

const socketService = async(io) => {
    let usuarios = [];
    io.on("connection", socket => {
        const idSocket = socket.id
        console.log("Usuario conectado  = " +idSocket)
        usuarios.push(idSocket)
        io.emit('activos' , usuarios)

        socket.on('disconnect', function() {
            console.log('Got disconnect!');
      
            var i = usuarios.indexOf(socket);
            usuarios.splice(i, 1);
            io.emit('activos' , usuarios)
         });

         socket.on('login' , (login) => {
            //const asignarSocketUsuario = await Usuario.update({ 'socket' : idSocket },{ where: {'id' : login['usuario']['id']} })
            console.log(login['usuario']['id'])
         })

       
    })




}

module.exports = {
    socketService
}
