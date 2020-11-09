const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

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
  const id = req.params.id
  Record.findById(id)
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
  const id = req.params.id
  const editedRecord = req.body
  Record.findById(id)
    .then(record => {
      Object.assign(record, editedRecord)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// route --> delete a record
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
