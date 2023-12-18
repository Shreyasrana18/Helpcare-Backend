const asyncHandler = require("express-async-handler");
const Patient = require("../../models/patientModel");
const mongoose = require("mongoose");
const qrcode = require("qrcode");
const multer = require('multer');
const { s3Uploadv2 } = require("./awss3service");
const bcrypt = require("bcryptjs");

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




const storage = multer.memoryStorage({});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});


const uploadprofilephoto = asyncHandler(async (req, res) => {
    const patient = await Patient.find({ userID: req.params.userID });

    if (!patient) {
        res.status(404);
        throw new Error('Patient not found');
    }

    const files = req.file;

    if (!files) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }

    try {
        const result = await s3Uploadv2(files);
        patient[0].profileimage=result;
        await patient[0].save();
        res.status(201).json({ file: result});
    } catch (error) {
        console.error('Error uploading to S3:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const uploadDocuments = asyncHandler(async (req, res) => {
    const files =req.file;
    if(!files){
        res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await s3Uploadv2(files);
    res.status(201).json({ file: result});
});

module.exports = { personalInfo, createPersonalInfo, updatePersonalInfo, deletePersonalInfo, generateQRcode, uploadprofilephoto, upload,uploadDocuments };