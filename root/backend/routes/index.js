const BusinessController = require('../controllers/BusinessController');
const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/users/register', UserController.registerUser);
router.post('/users/login', UserController.loginUser);

//router.get('/businesses', BusinessController);
router.post('/businesses/new-business', BusinessController.registerBusiness);

module.exports = router;


