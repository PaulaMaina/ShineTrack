import mongoose from 'mongoose';

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
        businessID: {
            type: String,
            required: true
        }
    },
    {
        Timestamp: true
    }
);

const Service = mongoose.model('Service', ServiceSchema);
export default Service;