const socketService = async(io) => {
    io.on("connection", socket => {
        const idSocket = socket.id
        console.log("Usuario conectado  = " +idSocket)
    })




}

module.exports = {
    socketService
}
