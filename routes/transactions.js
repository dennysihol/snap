var express = require('express');
const TransactionController = require('../controller/transactionController');
const router = express.Router();


router.post('/v1.0/transfer-va/inquiry', TransactionController.showTransaction);

module.exports = router;
