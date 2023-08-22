const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
    },
    address : {
        type: String,
    },
    contact : {
        type: Number,
    },
    email : {
        type: String,
    },
    diagnosticReport : [
        {
            type: String,
        }
    ],
    patientID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    }]
});

module.exports = mongoose.model('Diagnostic', diagnosticSchema);