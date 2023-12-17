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

    if (!doctorinfo) {
        res.status(404);
        throw new Error('Doctor not found');
    }

    let responseArray = [];
    for (const patient of doctorinfo[0].patientID) {
        const patientData = await Patient.find({ _id: patient._id }).populate('timeline').populate('report');
        responseArray = responseArray.concat(patientData); // array of objects - instead of using push{ it makes it an array of arrays{ harder to retrieve information}}
    }

    res.status(201).json(responseArray);
});


const addTimelineinfo = asyncHandler(async (req, res) => {
    const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(req.body.patientID) });
    const doctor = await Doctor.find({ _id: req.params.doctorID });
    if (!patient) {
        res.status(404);
        throw new Error('Patient not found');
    }
    if (patient[0].activeFlag == false) {
        res.status(404);
        throw new Error('Patient not active');
    }
    const addtimeline = new Timeline({
        date: req.body.date,
        event: req.body.event,
        description: req.body.description,
        attachments: req.body.attachments,
        doctorName: doctor[0].name,
    });
    
    try {
        await addtimeline.save();
        patient[0].timeline.push(addtimeline._id);
        if(!patient[0].doctorID.includes(req.params.doctorID))
        {
            patient[0].doctorID.push(req.params.doctorID);
        }
        await patient[0].save();
    } catch (err) {
        console.error('Error saving timeline:', err);
    }
    res.status(201).json(addtimeline);
});


module.exports = { patientListnames, patientTimeHealthinfo, addTimelineinfo };
