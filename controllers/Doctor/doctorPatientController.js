const asyncHandler = require('express-async-handler');
const Patient = require('../../models/patientModel');
const Doctor = require('../../models/doctorModel');
const Timeline = require('../../models/timelineModel');
const mongoose = require('mongoose');

// get patient list
const patientListnames = asyncHandler(async (req, res) => {
    const doctorinfo = await Doctor.find({ _id: req.params.doctorID }).populate('patientID');
    if (!doctorinfo) {
        res.status(404);
        throw new Error('Doctor not found');
    }
    res.status(201).json(doctorinfo[0].patientID[0].patientPersonalInformation['name']);
});

// get patient timelineinfo and healthinfo
const patientTimeHealthinfo = asyncHandler(async (req, res) => {
    const doctorinfo = await Doctor.find({ _id: req.params.doctorID }).populate('patientID');
    // console.log(doctorinfo[0].patientID);
    if (!doctorinfo) {
        res.status(404);
        throw new Error('Doctor not found');
    }
    const responseArray = [];
    for (const patient of doctorinfo[0].patientID) {
        const patientData = {
            patientName: patient.patientPersonalInformation.name,
            healthInformation: patient.healthInformation,
            timeline: patient.timeline
        };
        responseArray.push(patientData);
    }

    res.status(201).json(
        responseArray
    );
});

// update patient timeline info 
const updatePatientTimelineinfo = asyncHandler(async (req, res) => {
    const doctor = await Doctor.find({ _id: req.params.doctorID }).populate('patientID');
    const { userID, date, event, details, attachments } = req.body;
    if (doctor[0].patientID[0].userID != userID) {
        res.status(401);
        throw new Error('Incorrect userID or doctor doesnt have access to this patient');
    }
    const filter = { userID: new mongoose.Types.ObjectId(userID) };
    const update = {
        $set: {
            'timelineInformation.date': date,
            'timelineInformation.event': event,
            'timelineInformation.details': details,
            'timelineInformation.attachments': attachments
        }
    };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    if (!doctor) {
        res.status(404);
        throw new Error('Doctor not found');
    }
    res.status(201).json(patient.timelineInformation);
});

const addTimelineinfo = asyncHandler(async (req, res) => {
    const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(req.body.patientID) });
    if(!patient) {
        res.status(404);
        throw new Error('Patient not found');
    }
    const addtimeline = new Timeline({
        date: req.body.date,
        event: req.body.event,
        description: req.body.description,
        attachments: req.body.attachments
    });
    try{
        await addtimeline.save();
        await patient[0].timeline.push(addtimeline._id);
        await patient[0].save();
    }catch(err)
    {
        console.error('Error saving timeline:', err);
    }
    res.status(201).json(addtimeline);
});

module.exports = { patientListnames, patientTimeHealthinfo, updatePatientTimelineinfo,addTimelineinfo };
