const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
    },
    specialization: {
        type: String,
    },
    experience: {
        type: Number,
    },
    contact: {
        type: String,
    },

});

module.exports= mongoose.model('Doctor', doctorSchema);
