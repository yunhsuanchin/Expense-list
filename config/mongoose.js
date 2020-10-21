const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/expense-record-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('error!')
})

db.once('open', () => {
  console.log('connected!')
})

module.exports = db
