const Customer = require('../models/customer');

class CustomerController {
    static async registerCustomer(req, res) {
        try {
            const numberPlate = req.body.numberPlate;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const carModel = req.body.carModel;
            const phoneNumber = req.body.phoneNumber;
            const customerExists = await Customer.findOne({ numberPlate });
            
            if (customerExists){
                res.status(400).send({ error: 'This customer already exists' });
            }
            if (!numberPlate || !firstName || !lastName || !carModel) {
                res.status(400).send({ error: 'Please fill out all the required fields to register your customer' });
            }

            const newCustomer = {
                numberPlate: numberPlate,
                firstName: firstName,
                lastName: lastName,
                carModel: carModel,
                phoneNumber: phoneNumber,
                business: req.business._id,
            };

            const customer = await Customer.create(newCustomer);
            res.status(201).send(customer);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    };

    static async displayCustomer(req, res) {
        try {
            // Retrieves all the customer registered under a specific business
            const customers = await Customer.find({ user: req.business._id });

            // Send customers to the frontend
            res.status(200).json(customers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the customers'});
        }
    };
}

module.exports = CustomerController;