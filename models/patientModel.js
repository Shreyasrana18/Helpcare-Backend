const mongoose = require('mongoose');
const patientSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    patientPersonalInformation: {
        name: {
            type: String,
            required: false
        },
        age: {
            type: Number,
            required: false
        },
        gender: {
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
        emergencycontact: {
            type: Number,
            required: false
        },
    },
    healthInformation: {
        allergies: {
            type: String,
            required: false
        },
        bloodgroup: {
            type: String,
            required: false
        },
        weight: {
            type: Number,
            required: false
        },
        height: {
            type: Number,
            required: false
        },
        bmi: {
            type: String,
            required: false
        },
    },
    timelineInformation: {
        date: {
            type: Date,
            required: false
        },
        event: {
            type: String,
            required: false
        },
        details: {
            type: String,
            required: false
        },
        attachments: [{
            type: String,
            required: false
        }],
    },
},
    {
        timestamps: false,
    }
);



module.exports = mongoose.model('Patient', patientSchema);
