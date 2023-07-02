const mongoose = require('mongoose');


const healthInfoSchema = mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        ref: 'Patient'
    },
    allergies: {
        type: String,
        required: false
    },
    bloodgroup: {
        type: String,
        required: true
    },
    bloodpressure: {
        type: String,
        required: false
    },
    heartrate: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    bmi: {
        type: String,
        required: false
    },

},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('HealthInfo', healthInfoSchema);