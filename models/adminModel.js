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
    doctorInformation: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }], // array of doctor ids, refer to chatgpt search history
        default: [],

    },
    patientInformation: {
        name: {
            type: String,
        }
    }

});
module.exports = mongoose.model("Admin", adminSchema);