// require mongoose
const db = require('../../config/mongoose')
// require record model & category model
const Record = require('../record')
const Category = require('../category')
// require record.json
const records = require('../data/record.json')

db.once('open', () => {
  Category.find()
    .lean()
    .then(categories => {
      for (const record of records) {
        record.category = categories.find(category => category.title === record.category)._id
      }
      return Record.insertMany(records)
    })
    .then(() => console.log('Done for record seeder creation.'))
    .then(() => db.close())
    .catch((error) => console.error(error))
})
