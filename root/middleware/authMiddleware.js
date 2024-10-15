const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const asyncHandler = require('express-async-handler');

const protectRoutes = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the authorization header exists and it starts with Bearer
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];    // Extracts the token from the header
            const decoded = jwt.verify(token, process.env.JWT_SECRET);      // Verifies the token

            //Attaches the user object to the request without the password field
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            // Sends the error response and execution stops
            return res.status(401).send({ error: 'User not authorized. Token failed' });
        }
    }

    // If there's no token, sends an error message and stops execution
    if (!token) {
        return res.status(401).send({ error: 'User not authorized. No token' });
    }
});

module.exports = { protectRoutes };