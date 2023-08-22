const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    event: {
        type: String,
    },
    description: {
        type: String,
    },
    attachments: [{
        type: String,
    }],
});

module.exports = mongoose.model('Timeline', timelineSchema);