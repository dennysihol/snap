var express = require('express');
const TransactionController = require('../controller/transactionController');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authentication');

/* GET users listing. */
// router.get('/va/bills',authenticateToken , TransactionController.showTransaction);
router.post('/va/bills', TransactionController.showTransaction);

module.exports = router;
