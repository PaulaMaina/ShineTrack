const Customer = require('../models/customers');

class CustomerController {
    static async registerCustomer(req, res) {
        try {
            const carPlate = req.body.carPlate;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const carModel = req.body.carModel;
            const telephone = req.body.telephone;
            const business = req.body.business;
            const customerExists = await Customer.findOne({ carPlate });
            
            if (customerExists){
                return res.status(400).json({ error: 'This customer already exists' });
            }
            if (!carPlate || !firstName || !lastName || !carModel || !telephone) {
                return res.status(400).json({ error: 'Please fill out all the required fields to register your customer' });
            }

            const newCustomer = {
                carPlate: carPlate,
                firstName: firstName,
                lastName: lastName,
                carModel: carModel,
                telephone: telephone,
                business: business,
                user: req.user._id
            };

            const customer = await Customer.create(newCustomer);
            return res.status(201).json(customer);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    };

    static async displayCustomers(req, res) {
        try {
            // Retrieves all the customer registered under a specific user
            const customers = await Customer.find({ user: req.user._id });

            // Send customers to the frontend
            return res.status(200).json(customers);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while fetching the customers'});
        }
    };

    static async updateCustomer(req, res) {
        try {
            const customer = await Customer.findById(req.params.id);

            if (customer) {
                if (customer.user.toString() === req.user._id.toString()) {
                    const customerUpdate = await Customer.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                        runValidators: true
                    });

                    return res.status(200).json(customerUpdate);
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to update customer details' });
                }
            } else {
                return res.status(404).json({ message: 'Customer not found'});
            }
        } catch (error) {
            return res.status(500).json({ message: 'A server error occurred while updating the customer details' });
        }
    };

    static async deleteCustomer(req, res) {
        try {
            const customer = await Customer.findById(req.params.id);

            if (customer) {
                if (customer.user.toString() === req.user._id.toString()) {
                    await customer.deleteOne();
                    return res.status(200).json({ message: 'The customer was deleted successfully' });
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to delete customer details' });
                }
            } else {
                return res.status(404).json({ message: 'The customer was not found'});
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            return res.status(500).json({ message: 'A server error occurred while deleting the customer' });
        }
    };
}

module.exports = CustomerController;