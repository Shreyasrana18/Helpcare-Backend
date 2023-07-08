const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    personalInformation: {
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
    },
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;