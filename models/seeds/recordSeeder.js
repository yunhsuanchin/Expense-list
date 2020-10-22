// require record model
const Record = require('../record')

// require record.json
const records = require('../data/record.json')

// require mongoose
const db = require('../../config/mongoose')

db.once('open', () => {
  for (const record of records.results) {
    Record.create(record)
  }
  console.log('done.')
})
