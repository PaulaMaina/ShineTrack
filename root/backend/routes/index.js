const BusinessController = require('../controllers/BusinessController');
const express = require('express');
const { protectRoutes } = require('../middleware/authMiddleware');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/users/register', UserController.registerUser);
router.post('/users/login', UserController.loginUser);

//router.get('/businesses', BusinessController);
router.post('/businesses/new-business', protectRoutes, BusinessController.registerBusiness);

module.exports = router;


