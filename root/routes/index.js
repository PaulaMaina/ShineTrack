const BusinessController = require('../controllers/BusinessController');
const express = require('express');
const path = require('path');
const { protectRoutes } = require('../middleware/authMiddleware');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Serves the static files
router.use(express.static(path.join(__dirname, 'public')));

// Define the routes to serve the index page
router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// User registration
router.get('/register', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
router.post('/api/users/register', UserController.registerUser);

// User login
router.get('/login', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
router.post('/api/users/login', UserController.loginUser);

// Dashboard
router.get('/dashboard', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

//Business registration
router.get('/businesses', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'business.html'));
});
router.post('/api/businesses/new-business', protectRoutes, BusinessController.registerBusiness);

module.exports = router;


