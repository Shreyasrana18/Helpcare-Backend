const mongoose = require('mongoose');
const patientSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    patientPersonalInformation: {
        name: {
            type: String,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
        address: {
            type: String,
        },
        contact: {
            type: Number,
        },
        email: {
            type: String,
        },
        emergencycontact: {
            type: Number,
        },
    },
    healthInformation: {
        allergies: {
            type: String,
        },
        bloodgroup: {
            type: String,
        },
        weight: {
            type: Number,
        },
        height: {
            type: Number,
        },
        bmi: {
            type: String,
        },
    },
    timelineInformation: {
        date: {
            type: Date,
        },
        event: {
            type: String,
        },
        details: {
            type: String,
        },
        attachments: [{
            type: String,
        }],
    },
    qrcode: {
        type: String,
    },
    report: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
    }],

},
    {
        timestamps: true,
    }
);



module.exports = mongoose.model('Patient', patientSchema);
