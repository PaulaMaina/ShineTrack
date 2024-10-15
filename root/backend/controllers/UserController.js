const User = require('../models/users');
const generateToken = require('../utils/auth');

class UserController {
    static async registerUser(req, res) {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phoneNumber = req.body.phoneNumber;
        const emailAddress = req.body.emailAddress;
        const password = req.body.password;
        const userExists = await User.findOne({ phoneNumber });

        if (userExists) {
            res.status(400);
            throw new Error('This user already exists');
        }

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
            password: password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                phoneNumber: user.phoneNumber,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('The user data is invalid');
        }
    };

    static async loginUser(req, res) {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                phoneNumber: user.phoneNumber,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Ivalid phone number or password');
        }
    };
}

module.exports = UserController;