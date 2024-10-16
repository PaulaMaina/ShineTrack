const Service = require('../models/services');

class ServiceController {
    static async createAService(req, res) {
        try {
            const serviceName = req.body.serviceName;
            const unitPrice = req.body.unitPrice;
            const serviceExists = await Service.findOne({ serviceName });
            
            if (serviceExists){
                res.status(400).send({ error: 'This service already exists' });
            }
            if (!serviceName || !unitPrice) {
                res.status(400).send({ error: 'Please fill out all the required fields to register your service' });
            }

            const newService = {
                serviceName: serviceName,
                unitPrice: unitPrice,
                business: req.business._id,
            };

            const service = await Service.create(newService);
            res.status(201).send(service);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    };

    static async showServices(req, res) {
        try {
            // Retrieves all the services registered under a specific business
            const services = await Service.find({ user: req.business._id });

            // Send services to the frontend
            res.status(200).json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the services'});
        }
    };
}

module.exports = ServiceController;