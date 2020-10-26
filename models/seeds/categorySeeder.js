// require mongoose
const db = require('../../config/mongoose')
// require category model
const Category = require('../category')
// require category.json
const categories = require('../data/category.json')

db.once('open', () => {
  Category.insertMany(categories)
    .then(() => console.log('Done for category seeder creation.'))
    .then(() => db.close())
    .catch((error) => console.error(error))
})
