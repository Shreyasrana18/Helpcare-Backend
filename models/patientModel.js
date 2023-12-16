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
