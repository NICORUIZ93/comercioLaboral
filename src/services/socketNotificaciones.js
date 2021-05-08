const Usuario  = require('../db/models').Usuario
const axios = require('axios')

const socketService = async(io) => {
    let usuarios = [];
    io.on("connection", async socket => {
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

         socket.on('login' , async (login) => {
            const asignarSocketUsuario = await Usuario.update({ 'socket' : idSocket },{ where: {'id' : login['usuario']['id']} })
            console.log(await asignarSocketUsuario)
            console.log(login['usuario']['id'])
         })

         let nuevaFeria = undefined
         const consultaFeriaActiva = await axios.get('https://secure-atoll-67302.herokuapp.com/api/feriaActiva')
         console.log(consultaFeriaActiva.status)
             if (consultaFeriaActiva.status != 500) {
                nuevaFeria = consultaFeriaActiva.data   
             }
         io.emit('nueva-feria' , nuevaFeria )

       
    })




}

module.exports = {
    socketService
}
