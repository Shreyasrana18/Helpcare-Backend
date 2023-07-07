const asyncHandler = require("express-async-handler");
// const PatientTimeline = require("../models/timelineModel");
const Patient = require("../models/patientModel");
const mongoose = require("mongoose");

// get timeline information of a patient
const timelineInfo = asyncHandler(async (req, res) => {
    const timelineinfo = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    if (!timelineInfo) {
        res.status(404);
        throw new Error("Patient's PatientTimeline not found");
    }
    res.status(201).json(timelineinfo[0].timelineInformation);
});

// create timeline information of a patient
// const createTimelineInfo = asyncHandler(async (req, res) => {
//     const { userID, date, event, details, attachments } = req.body;
//     if (!date || !event) {
//         res.status(404);
//         throw new Error("Enter all required fields");
//     }
//     const patient = new Patient({
//         userID: userID,
//         timelineInformation: {
//             date: date,
//             event: event,
//             details: details,
//             attachments: attachments
//         }
//     });
//     try {
//         await patient.save();
//     } catch (error) {
//         console.error('Error saving patient:', error);
//     }
//     res.status(201).json(patient);
// });

// update timeline information of a patient
const updateTimelineInfo = asyncHandler(async (req, res) => {
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = {
        $set: {
            'timelineInformation.date': req.body.date,
            'timelineInformation.event': req.body.event,
            'timelineInformation.details': req.body.details,
            'timelineInformation.attachments': req.body.attachments
        }
    };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(201).json(patient.timelineInformation);
});

// delete timeline information of a patient
const deleteTimelineInfo = asyncHandler(async (req, res) => {
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = { $unset: { timelineInformation: 1 } };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json({ message: "Health Timeline removed" });
});

module.exports = { timelineInfo, updateTimelineInfo, deleteTimelineInfo }; 