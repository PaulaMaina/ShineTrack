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
                return res.status(400).json({ error: 'Please fill out all the required fields to register your business' });
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
            return res.status(201).send(business);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    };

    static async displayBusinesses(req, res) {
        try {
            // Retrieves all the businesses registed under a specific user
            const businesses = await Business.find({ user: req.user._id });

            // json businesses to the frontend
            res.status(200).json(businesses);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `An error occurred while fetching the businesses: ${error}` });
        }
    };

    static async updateBusiness(req, res) {
        try {
            const business = await Business.findById(req.params.id);

            if (business) {
                if (business.user.toString() === req.user._id.toString()) {
                    const bizUpdate = await Business.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                        runValidators: true
                    });

                    return res.status(200).json(bizUpdate);
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to update business details' });
                }
            } else {
                return res.status(404).json({ message: 'Business not found'});
            }
        } catch (error) {
            return res.json(500).json({ message: 'A server error occurred while updating the business' });
        }
    };

    static async deleteBusiness(req, res) {
        try {
            const business = await Business.findById(req.params.id);

            if (business) {
                if (business.user.toString() === req.user._id.toString()) {
                    await business.deleteOne();
                    return res.status(200).json({ message: 'Business deleted successfully' });
                } else {
                    return res.status(401).json({ message: 'This user is not authorized to delete business details' });
                }
            } else {
                return res.status(404).json({ message: 'Business not found'});
            }
        } catch (error) {
            console.error('Error deleting business:', error);
            return res.status(500).json({ message: 'A server error occurred while deleting the business' });
        }
    };
}

module.exports = BusinessController;