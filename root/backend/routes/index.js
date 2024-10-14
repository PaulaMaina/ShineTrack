const BusinessController = require('../controllers/BusinessController');
const express = require('express');
const UserController = require('../controllers/UserController');

const routes = (app) => {
    app = express.Router();

    app.post('/register', UserController.registerUser);
    app.post('/login', UserController.loginUser);

    //app.get('/businesses', BusinessController);
    app.post('/new-business', BusinessController.registerBusiness);
}

module.exports = routes;


