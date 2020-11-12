const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')

const Record = require('../../models/record')
const Category = require('../../models/category')

// route --> index page
router.get('/', (req, res) => {
  const { year, month, category } = req.query

  const userId = req.user._id
  Category.find()
    .lean()
    .then(categories =>
      Record.find({ userId })
        .lean()
        .populate('category')
        .sort('date')
        .then(records => {
          let totalAmount = 0

          records.forEach(record => console.log(record.date.get))

          // if (categoryFilter === 'all') {
          //   records.forEach(record => {
          //     totalAmount += record.amount
          //   })
          //   return res.render('index', { records, categories, totalAmount })
          // } else {
          //   const filterResults = records.filter(record => {
          //     return record.category.title === categoryFilter
          //   })
          //   filterResults.forEach(record => { totalAmount += record.amount })
          //   return res.render('index', { records: filterResults, categories, categoryFilter, totalAmount })
          // }
        })
        .catch(err => console.error(err))
    )
    .catch(err => console.error(err))
})

module.exports = router
