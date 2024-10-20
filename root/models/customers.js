const mongoose  = require('mongoose');

const CustomerSchema = mongoose.Schema(
    {
        carPlate: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        carModel: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;