var express = require('express');
const TransactionController = require('../controller/transactionController');
const router = express.Router();


router.post('/va/bills', TransactionController.showTransaction);

module.exports = router;
