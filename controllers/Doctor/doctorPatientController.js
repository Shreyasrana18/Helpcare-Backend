const asyncHandler = require('express-async-handler');
const Patient = require('../../models/patientModel');
const Doctor = require('../../models/doctorModel');
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
            timelineInformation: patient.timelineInformation
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

module.exports = { patientListnames, patientTimeHealthinfo, updatePatientTimelineinfo };
