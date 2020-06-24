const express = require('express')
const router = express.Router()

const addUser = require('../routes/addUser')
router.post('/addUser', addUser)

const addOrder = require('../routes/addOrder')
router.post('/addOrder', addOrder)

const totalOrder = require('../routes/totalOrders')
router.post('/totalOrder', totalOrder)

const updateTable = require('../routes/updateTable')
router.post('/update', updateTable)

module.exports = router;