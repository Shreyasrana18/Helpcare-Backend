const asyncHandler = require("express-async-handler");
const HealthTimeline = require("../models/timelineModel");

// get timeline information of a patient
const timelineInfo = asyncHandler(async (req, res) => {
    const timelineinfo = await HealthTimeline.findById(req.params.id);
    if (!timelineinfo) {
        res.status(404);
        throw new Error("Patient's healthtimeline not found");
    }
    res.status(201).json(timelineinfo);
});

// create timeline information of a patient
const createTimelineInfo = asyncHandler(async (req, res) => {
    const { patientId, date, event, details, attachments } = req.body;
    if (!patientId || !date || !event) {
        res.status(404);
        throw new Error("Enter all required fields");
    }
    const patient = await HealthTimeline.create({
        patientId,
        date,
        event,
        details,
        attachments
    });
    res.status(201).json(patient);
});

// update timeline information of a patient
const updateTimelineInfo = asyncHandler(async (req, res) => {
    const patient = await HealthTimeline.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    const updatedTimelineinfo = await HealthTimeline.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
    res.status(201).json(updatedTimelineinfo);
});

// delete timeline information of a patient
const deleteTimelineInfo = asyncHandler(async (req, res) => {
    const patient = await HealthTimeline.findById(req.params.id);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    await HealthTimeline.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Health Timeline removed" });
});

module.exports = { timelineInfo, createTimelineInfo, updateTimelineInfo, deleteTimelineInfo }; 