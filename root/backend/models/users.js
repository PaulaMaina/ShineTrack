import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        Timestamp: true
    }
);

const User = mongoose.model('User', UserSchema);
export default User;