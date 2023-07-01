const mongoose = require('mongoose');
const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
     },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Patient', patientSchema);