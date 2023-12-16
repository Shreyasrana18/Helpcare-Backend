const asyncHandler = require("express-async-handler");
// const PatientTimeline = require("../models/timelineModel");
const Patient = require("../../models/patientModel");
const Timeline = require("../../models/timelineModel");
const Report = require("../../models/reportModel");
const Doctor = require("../../models/doctorModel");
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

// remove particular timeline info
const removeTimeline = asyncHandler(async (req, res) => {
    const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    const index = patient[0].timeline.findIndex(req.body.timelineID);
    if (index !== -1) {
        patient[0].timeline.pull(req.body.timelineID);
        await patient[0].save();
        await Timeline.deleteOne({ _id: req.body.timelineID });
    }
    else {
        console.log("Timeline id not found");
    }
    res.status(200).json({ message: "Timeline removed" });

});


// remove report
const removeReport = asyncHandler(async (req, res) => {
    const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    const index = patient[0].report.findIndex(req.body.reportID);
    if (index !== -1) {
        patient[0].report.pull(req.body.reportID);
        await patient[0].save();
        await Report.deleteOne({ _id: req.body.reportID });
    }
    else {
        console.log("Report id not found");
    }
    res.status(200).json({ message: "Report removed" });
});


const getReport = asyncHandler(async (req, res) => {
    const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) }).populate('report');
    res.status(201).json(patient[0].report);
});

const getTimeline = asyncHandler(async (req, res) => {
    const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) }).populate('timeline');
    res.status(201).json(patient[0].timeline);
});

const patientUnlinkDoctor = asyncHandler(async (req, res) => {
    const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    const doctor = await Doctor.find({ _id: req.body.doctorID });
    if (!doctor || !patient) {
        res.status(404);
        throw new Error('Doctor or Patient not found');
    }
    const index = doctor[0].patientID.indexOf(patient[0]._id);
    if (index !== -1) {
        doctor[0].patientID.pull(patient[0]._id);
        patient[0].doctorID.pull(doctor[0]._id);
        await patient[0].save();
        await doctor[0].save();
    }
    else {
        console.log("Patient id not found");
    }
    res.status(200).json({ message: "Unlinked Doctor" });
});
module.exports = { timelineInfo, updateTimelineInfo, deleteTimelineInfo, removeTimeline, removeReport, getTimeline, getReport, patientUnlinkDoctor }; 