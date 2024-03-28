var express = require('express');
const UserController = require('../controller/userController');
var router = express.Router();

/* GET users listing. */
router.get('/users', UserController.showUsers)
router.get('/users/:id', UserController.getUser)
router.post('/users', UserController.addUser)

module.exports = router;
