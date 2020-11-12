if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require necessary modules
const express = require('express')
const app = express()
const PORT = process.env.PORT
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const helpers = require('./utils/exphbs-helper')
require('./config/mongoose')

// modules setting
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers
}))

app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.today = Date.now()
  res.locals.monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  res.locals.successMsg = req.flash('successMsg')
  res.locals.warningMsg = req.flash('warningMsg')
  res.locals.errorMsg = req.flash('errorMsg')
  next()
})
app.use(routes)

// listen
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
