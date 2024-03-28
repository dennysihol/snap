var express = require('express');
const TransactionController = require('../controller/transactionController');
var router = express.Router();

/* GET users listing. */
router.get('/va/bills', TransactionController.showTransaction)

module.exports = router;
