const asyncHandler = require("express-async-handler");
const Patient = require("../../models/patientModel");
const mongoose = require("mongoose");

// get health information of a patient
const healthinfo = asyncHandler(async (req, res) => {
    const healthinfo = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });//returns list
    // check if the user is authorized to access the health information
    if (healthinfo[0].userID.valueOf().toString() != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    if (!healthinfo) {
        res.status(404);
        throw new Error("Patient's personal information not found");
    }
    res.status(201).json(healthinfo[0].healthInformation);

});



// update health information of a patient
const updateHealthInfo = asyncHandler(async (req, res) => {
    if (req.params.userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const bmi = (req.body.weight / (req.body.height * req.body.height)).toFixed(2);
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = {
        $set: {
            'healthInformation.bloodgroup': req.body.bloodgroup,
            'healthInformation.height': req.body.height,
            'healthInformation.weight': req.body.weight,
            'healthInformation.allergies': req.body.allergies,
            'healthInformation.bmi': bmi
        }
    };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options); //return dict
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }

    res.status(201).json(patient.healthInformation);
});

// delete health information of a patient
const deleteHealthInfo = asyncHandler(async (req, res) => {
    if (req.params.userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = { $unset: { healthInformation: 1 } };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json({ message: "Patient's Health Information removed" });
});

module.exports = { healthinfo, updateHealthInfo, deleteHealthInfo };