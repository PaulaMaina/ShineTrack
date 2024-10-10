import mongoose from 'mongoose';

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
        }
    },
    {
        Timestamp: true
    }
);

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;