const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");


// get personal information of a patient
const personalInfo = asyncHandler(async (req, res) => {
    const personalinfo = await Patient.findById(req.params.id);
    if (!personalinfo) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(201).json(personalinfo);
});

// create personal information of a patient
const createPersonalInfo = asyncHandler(async (req, res) => {
    const { name, age, gender, address, email, contact, emergencycontact } = req.body;
    if (!name || !age || !gender || !address || !email || !contact) {
        res.status(404);
        throw new Error("Enter all required fields");
    }
    const patient = await Patient.create({
        name,
        age,
        gender,
        address,
        email,
        contact,
        emergencycontact
    });
    res.status(201).json(patient);
});

// update personal information of a patient
const updatePersonalInfo = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    const updatedPersonalinfo = await Patient.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
    res.status(201).json(updatedPersonalinfo);
});

// delete personal information of a patient
const deletePersonalInfo = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    await Patient.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Patient removed" });

});




module.exports = { personalInfo, createPersonalInfo, updatePersonalInfo, deletePersonalInfo };