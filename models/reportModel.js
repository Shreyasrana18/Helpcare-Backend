const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    date : {
        type: String,
        required: true
    },
    event : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    attachments : [{
        type: String,
        required: true
    }],
    diagnosticCenterName : {
        type: String,
    }
});

module.exports = mongoose.model('Report', reportSchema);