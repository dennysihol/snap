var express = require('express');
const PaymentController = require('../controller/paymentsController');
const router = express.Router();

/* GET users listing. */
// router.get('/va/bills',authenticateToken , TransactionController.showTransaction);
router.post('/v1.0/transfer-va/payment', PaymentController.showPayments);

module.exports = router;
