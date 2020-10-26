// require necessary modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')
require('./config/mongoose')

// modules setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

// route --> index page
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

// route --> go to new page
app.get('/records/new', (req, res) => {
  res.render('new')
})

// route --> post a new record
app.post('/records', (req, res) => {
  console.log(req.body)
})

// listen
app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})
