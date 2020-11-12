const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// route --> index page
router.get('/', (req, res, next) => {
  const userId = req.user._id
  const yearList = []
  Record.find({ userId })
    .then(records => {
      records.forEach((record) => {
        const year = record.date.toISOString().slice(0, 4)
        if (yearList.includes(year)) return
        yearList.push(year)
      })
      res.locals.yearList = yearList.reverse()
    })
  next()
}, (req, res) => {
  const userId = req.user._id
  const { year, month, category } = req.query
  const filter = { userId }

  Category.find()
    .lean()
    .then(categories => {
      // 畫面初始 --> 預設顯示2020年全部花費
      filter.date = {
        $gte: '2020-01-01',
        $lt: '2020-12-31'
      }

      if (year || month || category) {
        if (category !== 'all') {
          filter.category = categories.find(item => item.title === category)._id
        }
        if (month === 'all') {
          filter.date = {
            $gte: `${year}-01-01`,
            $lt: `${year}-12-31`
          }
        } else {
          filter.date = {
            $gte: `${year}-${month}-01`,
            $lt: `${year}-${month}-31`
          }
        }
      }

      Record.find(filter)
        .populate('category')
        .sort('date')
        .lean()
        .then(records => {
          let totalAmount = 0
          records.forEach((record) => {
            totalAmount += record.amount
          })

          return res.render('index', {
            category,
            year,
            month,
            categories,
            totalAmount,
            records
          })
        })
    })
    .catch(err => console.error(err))
})

module.exports = router
