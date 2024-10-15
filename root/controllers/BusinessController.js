const Business = require('../models/business');

class BusinessController {
    static async registerBusiness(req, res) {
        try {
            if (!req.body.bizname ||
                !req.body.bizLocation ||
                !req.body.telNumber ||
                !req.body.openingHours ||
                !req.body.closingHours
            ) {
                res.status(400).send({ error: 'Please fill out all the required fields to register your business' });
            }

            const newBusiness = {
                bizname: req.body.bizname,
                bizLocation: req.body.bizLocation,
                telNumber: req.body.telNumber,
                openingHours: req.body.openingHours,
                closingHours: req.body.closingHours,
                bizDescription: req.body.bizDescription,
                user: req.user._id,
            };

            const business = await Business.create(newBusiness);
            res.status(201).send(business);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    };

    static async displayBusinesses(req, res) {
        try {
            // Retrieves all the businesses registed under a specific user
            const businesses = await Business.find({ user: req.user._id });

            // Send businesses to the frontend
            res.json(businesses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the businesses'});
        }
    };
}

module.exports = BusinessController;