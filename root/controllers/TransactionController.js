const Transaction = require('../models/transactions');

class TransactionController {
    static async createTransaction(req, res) {
        try {
            const numberPlate = req.body.numberPlate;
            const service = req.body.service;
            const totalAmount = req.body.totalAmount;
            const paymentStatus = req.body.paymentStatus;
            const servedBy = req.body.servedBy;
            const pickupStatus = req.body.pickupStatus;

            if (!numberPlate ||
                !service ||
                !totalAmount ||
                !paymentStatus ||
                !servedBy ||
                !pickupStatus
            ) {
                res.status(400).send({ error: 'Please fill out all the required fields to create the transaction' });
            }

            const newTransaction = {
                numberPlate: numberPlate,
                service: service,
                totalAmount: totalAmount,
                paymentStatus: paymentStatus,
                servedBy: servedBy,
                pickupStatus: pickupStatus,
                business: business,
            };

            const transaction = await Transaction.create(newTransaction);
            res.status(201).send(transaction);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    };

    static async postTransactions(req, res) {
        try {
            // Retrieves all the transactions registered under a specific business
            const transactions = await Transaction.find({ business: req.business._id });

            // Send transactions to the frontend
            res.status(200).json(transactions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the transactions'});
        }
    };

    static async updateTransaction(req, res) {
        try {
            const transaction = await Transaction.findById(req.params.id);

            if (transaction) {
                if (business.user.toString() === req.user._id.toString()) {
                    const transactionUpdate = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                        runValidators: true
                    });

                    return res.status(200).json(transactionUpdate);
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to update transaction details' });
                }
            } else {
                return res.status(404).json({ message: 'Transaction not found'});
            }
        } catch (error) {
            return res.json(500).json({ message: 'A server error occurred while updating the transaction' });
        }
    };

    static async deleteTransaction(req, res) {
        try {
            const transaction = await Transaction.findById(req.params.id);

            if (transaction) {
                if (business.user.toString() === req.user._id.toString()) {
                    await transaction.deleteOne();
                    return res.status(200).json({ message: 'Transaction deleted successfully' });
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to delete transaction details' });
                }
            } else {
                return res.status(404).json({ message: 'Transaction not found'});
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            return res.status(500).json({ message: 'A server error occurred while deleting the transaction' });
        }
    };
}

module.exports = TransactionController;