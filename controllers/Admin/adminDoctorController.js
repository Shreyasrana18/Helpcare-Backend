const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminModel");
const Doctor = require("../../models/doctorModel");
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

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


const removeDoctorDb = asyncHandler(async (req, res) => {
    try {
        const { doctorID } = req.body;
        const hospital = await Admin.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
        await Doctor.deleteOne({_id : doctorID});

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



module.exports = { doctorList, addDoctor, removeDoctorDb }; 