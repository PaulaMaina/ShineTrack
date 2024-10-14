import mongoose from 'mongoose';

const TransactionSchema = mongoose.Schema(
    {
        numberPlate: {
            type: String,
            required: true,
        },
        services: {
            type: Array,
            required: true,
            default: []
        },
        totalAmount: {
            type: Number,
            required: true,
            default: 0
        },
        paymentStatus: {
            type: String,
            enum: ['Paid', 'Pending'],
            required: true
        },
        servedBy: {
            type: String,
            required: true
        },
        pickupStatus: {
            type: String,
            enum: ['Done', 'Pending']
        }
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;