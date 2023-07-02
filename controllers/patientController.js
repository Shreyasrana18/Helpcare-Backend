const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const healthInfo = require("../models/healthinfoModel");


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
    console.log(req.body);
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
    console.log(patient);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    await Patient.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Patient removed" });

});


// get health information of a patient
const healthinfo = asyncHandler(async (req, res) => {
    const healthinfo = await healthInfo.findById(req.params.id);
    if (!healthinfo) {
        res.status(404);
        throw new Error("Patient's personal information not found");
    }
    res.status(201).json(healthinfo);

});

// create health information of a patient
const createHealthInfo = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { patientId, bloodgroup, height, weight, allergies } = req.body;
    if (!patientId || !bloodgroup || !height || !weight) {
        res.status(404);
        throw new Error("Enter all required fields");
    }
    bmi = weight / (height * height);

    const patient = await healthInfo.create({
        patientId,
        bloodgroup,
        height,
        weight,
        allergies,
        bmi
    });
    res.status(201).json(patient);
});

// update health information of a patient
const updateHealthInfo = asyncHandler(async (req, res) => {
    const patient = await healthInfo.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    const updatedHealthinfo = await healthInfo.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
    res.status(201).json(updatedHealthinfo);
});

// delete health information of a patient
const deleteHealthInfo = asyncHandler(async (req, res) => {
    const patient = await healthInfo.findById(req.params.id);
    console.log(patient);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    await healthInfo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Patient removed" });
});


// get timeline information of a patient
const timelineInfo = asyncHandler(async (req, res) => {
    res.status(201).json({ message: "patient health timeline info route" });
});

module.exports = { healthinfo, personalInfo, timelineInfo, createPersonalInfo, createHealthInfo, updatePersonalInfo, deletePersonalInfo , updateHealthInfo, deleteHealthInfo };