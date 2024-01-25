var express = require('express');
const UserController = require('../controller/userController');
var router = express.Router();

/* GET users listing. */
router.get('', UserController.showUsers)
router.get('/:id', UserController.getUser)

module.exports = router;
