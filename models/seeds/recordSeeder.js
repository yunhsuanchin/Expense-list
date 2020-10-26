// require mongoose
const db = require('../../config/mongoose')
// require record model
const Record = require('../record')
// require record.json
const records = require('../data/record.json')

db.once('open', () => {
  Record.insertMany(records)
    .then(() => console.log('Done for record seeder creation.'))
    .then(() => db.close())
    .catch((error) => console.error(error))
})
