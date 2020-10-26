// require express & express.router
const express = require('express')
const router = express.Router()

// require record model & category model
const Record = require('../../models/record')
const Category = require('../../models/category')

// route --> index page & category filter
router.get('/', (req, res) => {
  const categoryFilter = req.query.category
  Record.find()
    .lean()
    .then(records =>
      Category.find()
        .lean()
        .sort('date')
        .then(categories => {
          if (!categoryFilter || categoryFilter === 'all') {
            return res.render('index', { records, categories })
          } else if (categoryFilter !== 'all') {
            const filterResults = records.filter(record => record.category === categoryFilter)
            return res.render('index', { records: filterResults, categories, categoryFilter })
          }
        })
        .catch(err => console.error(err))
    )
    .catch(err => console.error(err))
})

module.exports = router
