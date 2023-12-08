const asyncHandler = require("express-async-handler");
const Patient = require("../../models/patientModel");
const mongoose = require("mongoose");
const qrcode = require("qrcode");


// get personal information of a patient
const personalInfo = asyncHandler(async (req, res) => {
    const personalinfo = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    // check if the user is authorized to access the personal information
    if (personalinfo[0].userID.valueOf().toString() != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    if (!personalinfo) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(201).json(personalinfo[0]);
});

// create personal information of a patient
const createPersonalInfo = async (userID) => {
    if (!userID) {
        throw new Error("Enter all required fields");
    }

    const patient = new Patient({
        userID: userID,
    });

    try {
        await patient.save();
    } catch (error) {
        console.error('Error saving patient:', error);
        throw new Error('Error saving patient');
    }

    return patient['patientPersonalInformation'];
};

// update personal information of a patient
const updatePersonalInfo = asyncHandler(async (req, res) => {
    if (req.params.userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = {
        $set: {
            'patientPersonalInformation.name': req.body.name,
            'patientPersonalInformation.age': req.body.age,
            'patientPersonalInformation.gender': req.body.gender,
            'patientPersonalInformation.address': req.body.address,
            'patientPersonalInformation.email': req.body.email,
            'patientPersonalInformation.contact': req.body.contact,
            'patientPersonalInformation.emergencycontact': req.body.emergencycontact
        }
    };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(201).json(patient['patientPersonalInformation']);
});

// delete personal information of a patient
const deletePersonalInfo = asyncHandler(async (req, res) => {
    if (req.params.userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = { $unset: { patientPersonalInformation: 1 } };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);
    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json({ message: "Patient's Personal Information removed" });

});

// generate QR code for a patient
const generateQRcode = asyncHandler(async (req, res) => {
    userID = req.params.userID;
    if (req.params.userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const qr = await qrcode.toDataURL(userID);
    const filter = { userID: new mongoose.Types.ObjectId(userID) };
    const update = {
        $set: {
            'qrcode': qr
        }
    };
    const options = { new: true };
    const patient = await Patient.findOneAndUpdate(filter, update, options);
    res.status(200).json(patient['qrcode']);

});

const getreport = asyncHandler(async (req, res) => {
    const patientreport = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) }).populate('reportID');
    if (!report) {
        res.status(404);
        throw new Error("Report not found");
    }
    res.status(201).json(patientreport.report);
});


module.exports = { personalInfo, createPersonalInfo, updatePersonalInfo, deletePersonalInfo, generateQRcode };