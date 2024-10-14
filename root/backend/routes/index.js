const BusinessController = require('../controllers/BusinessController');
const UserController = require('../controllers/UserController');

const routes = (app) => {
    app.get('/', (_req, res) => {
        res.send('Hello from ShineTrack API server');
    });

    app.post('/register', UserController.registerUser);
    app.post('/login', UserController.loginUser);

    //app.get('/businesses', BusinessController);
    //app.post('new-business', BusinessController.registerBusiness);
}

module.exports = routes;


