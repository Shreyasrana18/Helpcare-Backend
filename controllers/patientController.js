const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");

const healthInfo = asyncHandler(async (req, res) => {
    res.status(201).json({ message: "patient health info route" });
});

const personalInfo = asyncHandler(async (req, res) => {
    const personalinfo = await Patient.findById(req.params.id);
    if (personalinfo) {
        res.status(201).json(personalinfo);
    } else {
        res.status(404);
        throw new Error("Patient not found");
    }

    // res.status(201).json({ message: `patient personal info route ${req.params.id}` });
});

const createPersonalInfo = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, age, gender, address, email, contact } = req.body;
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

const timelineInfo = asyncHandler(async (req, res) => {
    res.status(201).json({ message: "patient health timeline info route" });
});

module.exports = { healthInfo, personalInfo, timelineInfo, createPersonalInfo };