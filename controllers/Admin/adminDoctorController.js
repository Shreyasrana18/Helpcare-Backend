const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminModel");
const Doctor = require("../../models/doctorModel");
const Patient = require("../../models/patientModel");
const mongoose = require("mongoose");


// get list of doctor information
const doctorList = asyncHandler(async (req, res) => {
    const admininfo = await Admin.find({ userID: new mongoose.Types.ObjectId(req.params.userID) }).populate('doctorInformation');
    // check if the user is authorized to access the personal information
    if (admininfo[0].userID.valueOf().toString() != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    if (!admininfo) {
        res.status(404);
        throw new Error("Admin not found");
    }

    res.status(201).json(admininfo[0].doctorInformation);
});

// Add doctor information to the list
const addDoctor = asyncHandler(async (req, res) => {
    const { name, specialities, contact, email, username, password } = req.body;
    const hospital = await Admin.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });

    if (!hospital) {
        res.status(404);
        throw new Error('Hospital not found');
    }
    let doctor = await Doctor.findOne({ email });

    if (doctor) {
        hospital[0].doctorInformation.push(doctor._id);
    } else {
        console.log("create");
        doctor = new Doctor({
            name: name,
            specialities: specialities,
            contact: contact,
            email: email,
            username: username,
            password: password,
        });
        await doctor.save();
        hospital[0].doctorInformation.push(doctor._id);
    }

    await hospital[0].save();
    res.status(201).json({ message: 'Doctor added to hospital successfully' });
});

// remove doctor information from the list
const removeDoctorDb = asyncHandler(async (req, res) => {
    try {
        const { doctorID } = req.body;
        const hospital = await Admin.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
        await Doctor.deleteOne({ _id: doctorID });

        const index = hospital[0].doctorInformation.indexOf(doctorID);
        if (index !== -1) {
            hospital[0].doctorInformation.pull(doctorID);
            await hospital[0].save(); // remember to save the changes
            console.log("Doctor ID successfully removed from the array.");

        } else {
            console.log("Doctor ID not found in the array.");
        }
        res.status(201).json({ message: 'Doctor removed from hospital successfully' });
    } catch (error) {
        console.error(error);
    }
});

// link patient to doctor
const linkPatient = asyncHandler(async (req, res) => {
    const { patientID, doctorID } = req.body;
    const doctor = await Doctor.find({ _id: new mongoose.Types.ObjectId(doctorID) });
    const patient = await Patient.find({ userID: new mongoose.Types.ObjectId(patientID) });
    if (!doctor || !patient) {
        res.status(404);
        throw new Error('Doctor or Patient not found');
    }
    if (doctor[0].patientID.includes(patient[0]._id)) {
        res.status(200).json({ message: 'Patient already linked to doctor' });
    }
    else {
        doctor[0].patientID.push(patient[0]._id);
        await doctor[0].save();
        res.status(201).json({ message: 'Patient added to doctor successfully' });
    }

});



module.exports = { doctorList, addDoctor, removeDoctorDb, linkPatient }; 