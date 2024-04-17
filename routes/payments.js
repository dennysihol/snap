var express = require('express');
const PaymentController = require('../controller/paymentsController');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authentication');

/* GET users listing. */
// router.get('/va/bills',authenticateToken , TransactionController.showTransaction);
router.post('/va/payments', PaymentController.showPayments);

module.exports = router;
