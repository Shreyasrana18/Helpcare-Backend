const asyncHandler = require("express-async-handler");
const Patient = require("../../models/patientModel");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");

const secretKey = '123345';
const decryptValue = (encryptedValue, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};



// get health information of a patient
const healthinfo = asyncHandler(async (req, res) => {
    const healthInfo = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });

    // Check if the user is authorized to access the health information
    if (healthInfo[0].userID.valueOf().toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    if (!healthInfo || !healthInfo[0].healthInformation) {
        res.status(404);
        throw new Error("Patient's health information not found");
    }

    // Decrypt health information before sending the response
    const decryptedHealthInfo = {
        bloodgroup: decryptValue(healthInfo[0].healthInformation.bloodgroup, secretKey),
        height: decryptValue(healthInfo[0].healthInformation.height, secretKey),
        weight: decryptValue(healthInfo[0].healthInformation.weight, secretKey),
        allergies: decryptValue(healthInfo[0].healthInformation.allergies, secretKey),
        bmi: decryptValue(healthInfo[0].healthInformation.bmi, secretKey),
    };

    res.status(201).json(decryptedHealthInfo);
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
            'healthInformation.bloodgroup': CryptoJS.AES.encrypt(req.body.bloodgroup, secretKey).toString(),
            'healthInformation.height': CryptoJS.AES.encrypt(req.body.height, secretKey).toString(),
            'healthInformation.weight': CryptoJS.AES.encrypt(req.body.weight, secretKey).toString(),
            'healthInformation.allergies': CryptoJS.AES.encrypt(req.body.allergies, secretKey).toString(),
            'healthInformation.bmi': CryptoJS.AES.encrypt(bmi, secretKey).toString(),
        },
    };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);

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