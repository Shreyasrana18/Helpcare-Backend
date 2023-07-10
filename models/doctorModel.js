const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    specialities: {
        type: String,
    },
    email: {
        type: String,
    },
    contact: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

});

module.exports= mongoose.model('Doctor', doctorSchema);
