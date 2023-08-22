const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    date : {
        type: Date,
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
    }]
});

module.exports = mongoose.model('Report', reportSchema);