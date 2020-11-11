if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const records = require('../data/record.json')
const category = require('../category')

db.once('open', () => {
  // Record.create({
  //   name: '午餐',
  //   merchant: '春水堂',
  //   category: '5fabaf12b6cca86311fba6d3',
  //   date: '2020-07-09',
  //   amount: 220,
  //   userId: '5fabaf11f1ee6c6310cf3218'
  // })

  Category.find()
    .then(categories => {
      User.find()
        .then(users => {
          for (const record of records) {
            record.category = categories.find(category => category.title === record.category)._id
          }

          records.map((record, index) => {
            if (index < 2) {
              record.userId = users[0]._id
            } else {
              record.userId = users[1]._id
            }
          })
          return Record.insertMany(records)
        })
        .then(() => {
          console.log('Done for record seeder creation.')
          process.exit()
        })
        .catch((error) => console.error(error))
    })
})
