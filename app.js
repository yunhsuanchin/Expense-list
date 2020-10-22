// require necessary modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Record = require('./models/record')
require('./config/mongoose')

// modules setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// routes
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

// listen
app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})
