const config = require('../config/config');
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('../src/helpers/error-handler');
const app = express()
const server = require('http').Server(app)


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(helmet())
app.use(cors())
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

require("../src/routes/routes")(app)

app.use(errorHandler);

io.on("connection", socket => {
    let id = socket.id
    console.log("conexion con" + id)    
});

server.listen(config.PORT, function () {
    console.log(`App listening on port:${config.PORT}`);
});



