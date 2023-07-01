const mongoose = require('mongoose');
const patientSchema = mongoose.Schema({
    _id : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    bloodGroup: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    contact: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    },
},
    {
        timestamps: false,
    }
);

module.exports = mongoose.model('Patient', patientSchema);