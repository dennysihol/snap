const express = require('express')
const router = express.Router()
const userRouter = require('./users')
const transactionRouter = require('./transactions')


router.use(userRouter)
router.use(transactionRouter)

module.exports = router