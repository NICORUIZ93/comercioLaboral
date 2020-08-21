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

console.log('env variable 1' + process.env.JWT_SECRET);

require("../src/routes/routes")(app)

app.use(errorHandler);

console.log('hos variable' + process.env.HOST);

app.listen(config.PORT, config.HOST, function () {
    console.log(`App listening on http://${config.HOST}:${config.PORT}`);
  });
  