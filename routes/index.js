// require express & express.router
const express = require('express')
const router = express.Router()

// require home.js & records.js
const home = require('./modules/home')
const records = require('./modules/records')

router.use('/', home)
router.use('/records', records)

module.exports = router
