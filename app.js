// require necessary modules
const express = require('express')
require('./config/mongoose')

// modules setting
const app = express()

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})
