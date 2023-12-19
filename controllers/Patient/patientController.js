const asyncHandler = require("express-async-handler");
const Patient = require("../../models/patientModel");
const mongoose = require("mongoose");
const qrcode = require("qrcode");
const multer = require('multer');
const { s3Uploadv2 } = require("./awss3service");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");


const secretKey = '123345';
const decryptValue = (encryptedValue, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};


// get personal information of a patient
const personalInfo = asyncHandler(async (req, res) => {
    const personalinfo = await Patient.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });

    if (personalinfo[0].userID.valueOf().toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    if (!personalinfo) {
        res.status(404);
        throw new Error("Patient not found");
    }

    // Decrypt each field in personalinfo
    const decryptedPersonalInfo = {
        address: decryptValue(personalinfo[0].patientPersonalInformation.address, secretKey),
        age: decryptValue(personalinfo[0].patientPersonalInformation.age, secretKey),
        contact: decryptValue(personalinfo[0].patientPersonalInformation.contact, secretKey),
        email: decryptValue(personalinfo[0].patientPersonalInformation.email, secretKey),
        gender: decryptValue(personalinfo[0].patientPersonalInformation.gender, secretKey),
        name: decryptValue(personalinfo[0].patientPersonalInformation.name, secretKey),
        emergencycontact: decryptValue(personalinfo[0].patientPersonalInformation.emergencycontact, secretKey),
    };

    res.status(201).json(decryptedPersonalInfo);
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
            'patientPersonalInformation.name': CryptoJS.AES.encrypt(req.body.name, secretKey).toString(),
            'patientPersonalInformation.age': CryptoJS.AES.encrypt(req.body.age, secretKey).toString(),
            'patientPersonalInformation.gender': CryptoJS.AES.encrypt(req.body.gender, secretKey).toString(),
            'patientPersonalInformation.address': CryptoJS.AES.encrypt(req.body.address, secretKey).toString(),
            'patientPersonalInformation.email': CryptoJS.AES.encrypt(req.body.email, secretKey).toString(),
            'patientPersonalInformation.contact': CryptoJS.AES.encrypt(req.body.contact, secretKey).toString(),
            'patientPersonalInformation.emergencycontact': CryptoJS.AES.encrypt(req.body.emergencycontact, secretKey).toString()
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
        patient[0].profileimage = result;
        await patient[0].save();
        res.status(201).json({ file: result });
    } catch (error) {
        console.error('Error uploading to S3:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const uploadDocuments = asyncHandler(async (req, res) => {
    const files = req.file;
    if (!files) {
        res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await s3Uploadv2(files);
    res.status(201).json({ file: result });
});

module.exports = { personalInfo, createPersonalInfo, updatePersonalInfo, deletePersonalInfo, generateQRcode, uploadprofilephoto, upload, uploadDocuments };