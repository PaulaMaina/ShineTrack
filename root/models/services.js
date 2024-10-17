const mongoose  = require('mongoose');

const ServiceSchema = mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: true
        },
        unitPrice: {
            type: Number,
            required: true
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;