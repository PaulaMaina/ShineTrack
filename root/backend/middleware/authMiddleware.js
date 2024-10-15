const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const asyncHandler = require('express-async-handler');

const protectRoutes = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).send({ error: 'User not authorized. Token failed' });
        }
    }

    if (!token) {
        res.status(401).send({ error: 'User not authorized. No token' });
    }
});

module.exports = { protectRoutes };