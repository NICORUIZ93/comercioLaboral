const express = require('express')
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

require("../src/routes/routes")(app)

app.get('/', (req, res) => res.json({ message: 'Hello World' }))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))