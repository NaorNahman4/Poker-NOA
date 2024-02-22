const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users.js');

//Get all users
router.route('/users').get(userControllers.getAllUsers);

//Validate a user that wants to connect
router.route('/validateUser').post(userControllers.validateUser);


module.exports = router;