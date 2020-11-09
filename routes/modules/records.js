const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const User = require('../../models/user')

// route --> go to new page
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.error(err))
})

// route --> post a new record
router.post('/', (req, res) => {
  const newRecord = req.body
  newRecord.userId = req.user._id
  Record.create(newRecord)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// route --> go to edit page
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .lean()
    .populate('category')
    .then(record =>
      Category.find()
        .lean()
        .then(categories => res.render('edit', { record, categories })))
    .catch(err => console.error(err))
})

// route --> put a record
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const editedRecord = req.body
  Record.findOne({ _id, userId })
    .then(record => {
      Object.assign(record, editedRecord)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// route --> delete a record
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
