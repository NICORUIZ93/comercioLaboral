const socketService = async(io) => {
    let usuarios = [];
    io.on("connection", socket => {
        const idSocket = socket.id
        console.log("Usuario conectado  = " +idSocket)
        usuarios.push(idSocket)
        socket.emit('activos' , usuarios)

        socket.on('disconnect', function() {
            console.log('Got disconnect!');
      
            var i = usuarios.indexOf(socket);
            usuarios.splice(i, 1);
            socket.emit('activos' , usuarios)
         });

       
    })




}

module.exports = {
    socketService
}
