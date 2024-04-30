const express = require('express');
const PaymentController = require('../controller/paymentsController');
const router = express.Router();

/* GET users listing. */
router.post('/v1.0/transfer-va/payment', PaymentController.showPayments);

module.exports = router;
