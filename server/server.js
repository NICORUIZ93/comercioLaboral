const config = require('../config/config');
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(helmet())
app.use(cors())

require("../src/routes/routes")(app)

app.get('/', (req, res) => res.json({ message: 'Hello World' }))


app.listen(config.PORT, config.HOST, function () {
    console.log(`App listening on http://${config.HOST}:${config.PORT}`);
  });
  