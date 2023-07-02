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