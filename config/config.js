const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000
  }