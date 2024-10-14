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
                res.status(400);
                throw new Error('Please fill out all the required fields to register your business');
            }

            const newBusiness = {
                bizname: req.body.bizname,
                bizLocation: req.body.bizLocation,
                telNumber: req.body.telNumber,
                openingHours: req.body.openingHours,
                closingHours: req.body.closingHours,
                bizDescription: req.body.bizDescription,
            };

            const business = await Business.create(newBusiness);
            res.status(201).send(business);

        } catch (error) {
            console.log(error);
            res.status(500);
            throw new Error(error);
        }
    };
}

module.exports = BusinessController;