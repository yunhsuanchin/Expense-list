// require necessary modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')
const Category = require('./models/category')
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
    .catch(err => console.error(err))
})

// route --> go to new page
app.get('/records/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.error(err))
})

// route --> post a new record
app.post('/records', (req, res) => {
  const newRecord = req.body
  Record.create(newRecord)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// listen
app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})
