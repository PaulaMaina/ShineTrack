const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema(
    {
        bizname: {
            type: String,
            required: true
        },
        bizLocation: {
            type: String,
            required: true
        },
        telNumber: {
            type: String,
            required: true
        },
        openingHours: {
            type: String,
            required: true,
            default: '8:00 am'
        },
        closingHours: {
            type: String,
            required: true,
            default: '8:00 pm'
        },
        bizDescription: {
            type: String,
            required: false
        }
    },
    //Automatically adds created at and updated at
    {
        timestamps: true,
    }
);

const Business = mongoose.model('Business', BusinessSchema);
module.exports = Business;