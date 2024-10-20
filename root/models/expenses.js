const mongoose  = require('mongoose');

const ExpenseSchema = mongoose.Schema(
    {
        expense: {
            type: String,
            required: true,
        },
        expenseAmount: {
            type: Number,
            required: true,
            default: 0
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

const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;