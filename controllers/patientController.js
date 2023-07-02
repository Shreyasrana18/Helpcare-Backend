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
    const { name, age, gender, address, email, contact } = req.body;
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
    });
    res.status(201).json(patient);
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
    const { patientId, bloodgroup, height, weight, allergies, bloodpressure, heartrate } = req.body;
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
        bloodpressure,
        heartrate,
        bmi
    });
    res.status(201).json(patient);
});

// get timeline information of a patient
const timelineInfo = asyncHandler(async (req, res) => {
    res.status(201).json({ message: "patient health timeline info route" });
});

module.exports = { healthinfo, personalInfo, timelineInfo, createPersonalInfo, createHealthInfo };