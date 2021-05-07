const socketService = async(io) => {
    let usuarios = [];
    io.on("connection", socket => {
        const idSocket = socket.id
        console.log("Usuario conectado  = " +idSocket)
        usuarios.push("Usuario conectado  = " +idSocket)
        io.emit('activos' , usuarios)
    })

    function removeItemFromArr ( arr, item ) {
        var i = arr.indexOf( item );
     
        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
    }

    io.on("disconnect" , socket => {
        removeItemFromArr(usuarios , socket.id)
        io.emit('activos' , usuarios)
    })



}

module.exports = {
    socketService
}
