const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    hospitalInformation: {
        name: {
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
        specialities: {
            type: [String],
        },
        rating: {
            type: Number,
        },
        description: {
            type: String,
        }
    },
    doctorInformation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        }],
    patientInformation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        }]
});
module.exports = mongoose.model("Admin", adminSchema);