const mongoose  = require('mongoose');

const TransactionSchema = mongoose.Schema(
    {
        numberPlate: {
            type: String,
            required: true,
        },
        service: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
            default: 0
        },
        paymentStatus: {
            type: String,
            required: true
        },
        servedBy: {
            type: String,
            required: true
        },
        pickupStatus: {
            type: String,
            required: true
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;