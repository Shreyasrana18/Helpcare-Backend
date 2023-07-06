const asyncHandler = require("express-async-handler");
// const PatientTimeline = require("../models/timelineModel");
const PatientTimeline = require("../models/patientModel");

// get timeline information of a patient
const timelineInfo = asyncHandler(async (req, res) => {
    const timelineinfo = await PatientTimeline.findById(req.params.id).select('timelineInformation');
    if (!timelineinfo) {
        res.status(404);
        throw new Error("Patient's PatientTimeline not found");
    }
    res.status(201).json(timelineinfo.timelineInformation);
});

// create timeline information of a patient
const createTimelineInfo = asyncHandler(async (req, res) => {
    const {userID, date, event, details, attachments } = req.body;
    console.log(req.body);
    if (!date || !event) {
        res.status(404);
        throw new Error("Enter all required fields");
    }
    const patient = await PatientTimeline.create({
        userID,
        timelineInformation: {
            date,
            event,
            details,
            attachments
        },
    });
    res.status(201).json(patient);
});

// update timeline information of a patient
const updateTimelineInfo = asyncHandler(async (req, res) => {
    const patient = await PatientTimeline.findById(req.params.id).select('timelineInformation');
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    const updatedTimelineinfo = await PatientTimeline.findByIdAndUpdate(req.params.id,
        req.body, { new: true }).select('timelineInformation');
    res.status(201).json(updatedTimelineinfo.timelineInformation);
});

// delete timeline information of a patient
const deleteTimelineInfo = asyncHandler(async (req, res) => {
    const patient = await PatientTimeline.findById(req.params.id).select('timelineInformation');
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    await PatientTimeline.deleteOne({ _id: req.params.id }).select('timelineInformation');
    res.status(200).json({ message: "Health Timeline removed" });
});

module.exports = { timelineInfo, createTimelineInfo, updateTimelineInfo, deleteTimelineInfo }; 