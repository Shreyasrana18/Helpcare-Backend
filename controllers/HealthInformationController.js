const asyncHandler = require("express-async-handler");
const healthInfo = require("../models/healthinfoModel");


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
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    await healthInfo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Patient removed" });
});

module.exports = { healthinfo, createHealthInfo, updateHealthInfo, deleteHealthInfo };