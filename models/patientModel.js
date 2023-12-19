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
            type: String,
        },
        gender: {
            type: String,
        },
        address: {
            type: String,
        },
        contact: {
            type: String,
        },
        email: {
            type: String,
        },
        emergencycontact: {
            type: String,
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
            type: String,
        },
        height: {
            type: String,
        },
        bmi: {
            type: String,
        },
    },
    qrcode: {
        type: String,
    },
    report: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report',
        }
    ],
    activeflag: {
        type: Boolean,
        default: false,
    },
    doctorID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    }],
    timeline: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Timeline',
        }
    ],
    profileimage: {
        type: String,
    },
    
},
    {
        timestamps: true,
    }
);



module.exports = mongoose.model('Patient', patientSchema);
