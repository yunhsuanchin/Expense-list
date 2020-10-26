// require express & express.router
const express = require('express')
const router = express.Router()

// require record model
const Record = require('../../models/record')

// route --> index page
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort('_id')
    .then(records => res.render('index', { records }))
    .catch(err => console.error(err))
})

module.exports = router
