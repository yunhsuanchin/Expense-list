if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const categories = require('../data/category.json')

db.once('open', () => {
  Promise.all([Category.deleteMany()])
    .then(() => {
      Category.insertMany(categories)
        .then(() => {
          console.log('Done for category seeder creation.')
          process.exit()
        })
        .catch((error) => console.error(error))
    })
})
