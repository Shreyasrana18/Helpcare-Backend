const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const mongoose = require("mongoose");

// get health information of a patient
const healthinfo = asyncHandler(async (req, res) => {
    const healthinfo = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) }); //returns list
    if (!healthinfo) {
        res.status(404);
        throw new Error("Patient's personal information not found");
    }
    res.status(201).json(healthinfo[0].healthInformation);

});

// // create health information of a patient
// const createHealthInfo = asyncHandler(async (req, res) => {
//     const { userID, bloodgroup, height, weight, allergies } = req.body;
//     if (!userID || !bloodgroup || !height || !weight) {
//         res.status(404);
//         throw new Error("Enter all required fields"); 
//     }
//     bmi_calc = weight / (height * height);

//     const patient = new Patient({
//         userID: userID,
//         healthInformation: {
//             bloodgroup: bloodgroup,
//             height: height,
//             weight: weight,
//             allergies: allergies,
//             bmi: bmi_calc 
//         }
//     });
//     try {
//         await patient.save();
//     } catch (error) {
//         console.error('Error saving patient:', error);
//     }
//     res.status(201).json(patient);
// });

// update health information of a patient
const updateHealthInfo = asyncHandler(async (req, res) => {
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    console.log(req.body,filter);
    const update = {
        $set: {
            'healthInformation.bloodgroup': req.body.bloodgroup,
            'healthInformation.height': req.body.height,
            'healthInformation.weight': req.body.weight,
            'healthInformation.allergies': req.body.allergies,
            'healthInformation.bmi': req.body.bmi
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

module.exports = { healthinfo,  updateHealthInfo, deleteHealthInfo };