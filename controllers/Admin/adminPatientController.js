const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminModel");
const Doctor = require("../../models/doctorModel");
const Patient = require("../../models/patientModel");
const mongoose = require("mongoose");

const patientList = asyncHandler(async (req, res) => {
    const admininfo = await Admin.find({ userID: new mongoose.Types.ObjectId(req.params.userID) }).populate('patientInformation');
    // check if the user is authorized to access the personal information
    if (admininfo[0].userID.valueOf().toString() != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    if (!admininfo) {
        res.status(404);
        throw new Error("Admin not found");
    }
    res.status(201).json(admininfo[0].patientInformation);
});

const addPatient = asyncHandler(async (req, res) => {
    const { userID } = req.body;
    const hospital = await Admin.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(userID) });
    if (!hospital) {
        res.status(404);
        throw new Error('Hospital not found');
    }
    if (!patient) {
        res.status(404);
        throw new Error('Patient not found');
    }
    hospital[0].patientInformation.push(patient[0]._id);
    await hospital[0].save();
    res.status(201).json({ message: 'Patient added to hospital successfully' });
});

const removePatientDb = asyncHandler(async (req, res) => {
    try {
        const { patientID } = req.body;
        const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(patientID) });
        const hospital = await Admin.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
        const index = hospital[0].patientInformation.indexOf(patient[0]._id);
        if (index !== -1) {
            hospital[0].patientInformation.pull(patient[0]._id);
            await hospital[0].save(); // remember to save the changes
            console.log("Patient ID successfully removed from the array.");

        } else {
            console.log("Patient ID not found in the array.");
        }
        res.status(201).json({ message: 'Patient removed from hospital success' });
    } catch (error) {
        console.error(error);
    }
});

module.exports = { patientList, addPatient, removePatientDb };