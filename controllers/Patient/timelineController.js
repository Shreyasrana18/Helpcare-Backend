const asyncHandler = require("express-async-handler");
// const PatientTimeline = require("../models/timelineModel");
const Patient = require("../../models/patientModel");
const mongoose = require("mongoose");

// get timeline information of a patient
const timelineInfo = asyncHandler(async (req, res) => {
    const timelineinfo = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    // check if the user is authorized to access the timeline information
    if (timelineinfo[0].userID.valueOf().toString() != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    if (!timelineInfo) {
        res.status(404);
        throw new Error("Patient's PatientTimeline not found");
    }
    res.status(201).json(timelineinfo[0].timelineInformation);
});


// update timeline information of a patient
const updateTimelineInfo = asyncHandler(async (req, res) => {
    if (req.params.userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
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
    if (req.params.userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
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