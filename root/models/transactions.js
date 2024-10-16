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
            enum: ['Done', 'Pending'],
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
export default Transaction;