const express = require('express')
const router = express.Router()
const transactionRouter = require('./transactions')
const paymentRouter = require('./payments')
const { generateToken, authenticateToken } = require('../middlewares/authentication');


router.use('/v1.0/access-token/b2b', generateToken)
router.use(authenticateToken, transactionRouter)
router.use(authenticateToken, paymentRouter)

module.exports = router