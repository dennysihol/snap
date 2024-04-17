const express = require('express')
const router = express.Router()
const userRouter = require('./users')
const transactionRouter = require('./transactions')
const paymentRouter = require('./payments')


router.use(userRouter)
router.use(transactionRouter)
router.use(paymentRouter)

module.exports = router