const Transaction = require('../models/transactions');

class TransactionController {
    static async createTransaction(req, res) {
        try {
            const numberPlate = req.body.numberPlate;
            const services = req.body.services;
            const totalAmount = req.body.totalAmount;
            const paymentStatus = req.body.paymentStatus;
            const servedBy = req.body.servedBy;
            const pickupStatus = pickupStatus;

            if (!numberPlate ||
                !services ||
                !totalAmount ||
                !paymentStatus ||
                !servedBy ||
                !pickupStatus
            ) {
                res.status(400).send({ error: 'Please fill out all the required fields to create the transaction' });
            }

            const newTransaction = {
                numberPlate: numberPlate,
                services: services,
                totalAmount: totalAmount,
                paymentStatus: paymentStatus,
                servedBy: servedBy,
                pickupStatus: pickupStatus,
                business: req.business._id,
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
            const transactions = await Transaction.find({ user: req.business._id });

            // Send transactions to the frontend
            res.status(200).json(transactions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the transactions'});
        }
    };
}

module.exports = TransactionController;