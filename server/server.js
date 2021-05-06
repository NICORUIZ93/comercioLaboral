const config = require('../config/config');
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('../src/helpers/error-handler');
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(helmet())
app.use(cors())


io.on('connection' , (socket) => {
    const idConexion = socket.id
    console.log("Conexion establecida con " + idConexion)
})

require("../src/routes/routes")(app)

app.use(errorHandler);

server.listen(config.PORT, function () {
    console.log(`App listening on port:${config.PORT}`);
});
