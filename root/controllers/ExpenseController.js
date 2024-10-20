const Expense = require('../models/expenses');

class ExpenseController {
    static async createExpense(req, res) {
        try {
            const expense = req.body.expense;
            const expenseAmount = req.body.expenseAmount;
            const business = req.body.business;

            if (!expense || !expenseAmount) {
                res.status(400).send({ error: 'Please fill out all the required fields to create the expense' });
            }

            const newExpense = {
                expense: expense,
                expenseAmount: expenseAmount,
                business: business,
                user: req.user._id
            };

            const expenseRecord = await Expense.create(newExpense);
            res.status(201).send(expenseRecord);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    };

    static async postExpenses(req, res) {
        try {
            // Retrieves all the expenses registered under a specific user
            const expenses = await Expense.aggregate([
                {
                    $match: { user: req.user._id }
                },
                {
                    $lookup: {
                        from: 'businesses',
                        localField: 'business',
                        foreignField: '_id',
                        as: 'businessDetails'
                    }
                },
                {
                    $unwind: '$businessDetails'
                },
                {
                    $project: {
                        expense: 1,
                        expenseAmount: 1,
                        'business': '$businessDetails.bizname'
                    }
                }
            ]);

            // Send expenses to the frontend
            res.status(200).json(expenses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the transactions'});
        }
    };

    static async updateExpense(req, res) {
        try {
            const expense = await Expense.findById(req.params.id);

            if (expense) {
                if (expense.user.toString() === req.user._id.toString()) {
                    const expenseUpdate = await Expense.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                        runValidators: true
                    });

                    return res.status(200).json(expenseUpdate);
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to update expenses details' });
                }
            } else {
                return res.status(404).json({ message: 'Expense not found'});
            }
        } catch (error) {
            return res.status(500).json({ message: 'A server error occurred while updating the expense' });
        }
    };

    static async deleteExpense(req, res) {
        try {
            const expense = await Expense.findById(req.params.id);

            if (expense) {
                if (expense.user.toString() === req.user._id.toString()) {
                    await expense.deleteOne();
                    return res.status(200).json({ message: 'Expense deleted successfully' });
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to delete expense details' });
                }
            } else {
                return res.status(404).json({ message: 'Expense not found'});
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
            return res.status(500).json({ message: 'A server error occurred while deleting the expense' });
        }
    };

    static async totalExpenses(_req, res) {
        try {
            const totalExpenses = await Expense.aggregate([
                {
                    $group: {
                        _id: null,      // Groups all the expenses together
                        totalAmountUsed: { $sum: '$expenseAmount'}
                    }
                }
            ]);

            if (totalExpenses.length > 0) {
                return res.status(200).json({ totalAmountUsed: totalExpenses[0].totalAmountUsed });
            } else {
                return res.status(200).json({ totalAmountUsed: 0 });
            }
        } catch (error) {
            return res.status(500).json({ message: 'A server error occurred while computing the total amount used:', error});
        }
    };
}

module.exports = ExpenseController;