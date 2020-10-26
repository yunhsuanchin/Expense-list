// require necessary modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

// modules setting
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    if_equal(oldValue, newValue, option) {
      if (oldValue === newValue) {
        return option.fn(this)
      }
    }
  }
}))

app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// listen
app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000')
})
