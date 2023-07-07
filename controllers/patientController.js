const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const mongoose = require("mongoose");


// get personal information of a patient
const personalInfo = asyncHandler(async (req, res) => {
    const personalinfo = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    if (!personalinfo) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(201).json(personalinfo[0].patientPersonalInformation);
});

// create personal information of a patient
const createPersonalInfo = asyncHandler(async (req, res) => {
    const { userID, name, age, gender, address, email, contact, emergencycontact } = req.body;
    if (!name || !age || !gender || !address || !email || !contact) {
        res.status(404);
        throw new Error("Enter all required fields");
    }
    const patient = new Patient({
        userID: userID,
        patientPersonalInformation: {
            name: name,
            age: age,
            gender: gender,
            address: address,
            email: email,
            contact: contact,
            emergencycontact: emergencycontact
        }
    });
    try {
        await patient.save();
    } catch (error) {
        console.error('Error saving patient:', error);
    }
    res.status(201).json(patient['patientPersonalInformation']);
});

// update personal information of a patient
const updatePersonalInfo = asyncHandler(async (req, res) => {
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = {
        $set: {
            'patientPersonalInformation.name': req.body.name,
            'patientPersonalInformation.age': req.body.age,
            'patientPersonalInformation.gender': req.body.gender,
            'patientPersonalInformation.address': req.body.address,
            'patientPersonalInformation.email': req.body.email,
            'patientPersonalInformation.contact': req.body.contact,
            'patientPersonalInformation.emergencycontact': req.body.emergencycontact
        }
    };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(201).json(patient['patientPersonalInformation']);
});

// delete personal information of a patient
const deletePersonalInfo = asyncHandler(async (req, res) => {
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = { $unset: { patientPersonalInformation: 1 } };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json({ message: "Patient's Personal Information removed" });

});




module.exports = { personalInfo, createPersonalInfo, updatePersonalInfo, deletePersonalInfo };