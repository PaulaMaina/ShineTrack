const mongoose  = require('mongoose');

const EmployeeSchema = mongoose.Schema(
    {
        idNumber: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true,
            default: 0
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;