const mongoose = require('mongoose');
const HealthTimelineSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    attachments: [{
        type: String,
        required: false
    }],
});

module.exports = mongoose.model('HealthTimeline', HealthTimelineSchema);