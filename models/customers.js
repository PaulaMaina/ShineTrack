import { ListCollectionsCursor, Timestamp } from 'mongodb';
import mongoose from 'mongoose';

const CustomerSchema = mongoose.Schema(
    {
        numberPlate: {
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
        carCategory: {
            type: String,
            enum: ['A1, A2, A3, B, C1, C, CD, D1, D2, D3, E, F, G'],
            required: true
        },
        carModel: {
            type: String,
            required: false
        },
        businessID: {
            type: String,
            required: true
        }
    },
    {
        Timestamp: true,
    }
);

const Customer = mongoose.model('Customer', CustomerSchema);