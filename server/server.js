const config = require('../config/config');
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('../src/helpers/error-handler');

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(helmet())
app.use(cors())
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
*/

require("../src/routes/routes")(app)

app.use(errorHandler);

app.listen(config.PORT, function () {
    console.log(`App listening on port:${config.PORT}`);
});
