const socketService = async(io) => {
    let usuarios = [];
    io.on("connection", socket => {
        const idSocket = socket.id
        console.log("Usuario conectado  = " +idSocket)
        usuarios.push("Usuario conectado  = " +idSocket)
    })

    io.emit('activos' , usuarios)




}

module.exports = {
    socketService
}
