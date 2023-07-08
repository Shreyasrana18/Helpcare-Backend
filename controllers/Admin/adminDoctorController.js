const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminModel");
const Doctor = require("../../models/doctorModel");
const mongoose = require("mongoose");

// get list of doctor information
const doctorList = asyncHandler(async (req, res) => {
    const admininfo = await Admin.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    // check if the user is authorized to access the personal information
    if (admininfo[0].userID.valueOf().toString() != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    if (!admininfo) {
        res.status(404);
        throw new Error("Admin not found");
    }
    res.status(201).json(admininfo.doctorInformation);
});

// Add doctor information to the list
const addDoctor = asyncHandler(async (req, res) => {
    const { name, specialities, contact, email } = req.body;
    console.log(name, specialities, contact, email );

    const hospital = await Admin.find({ userID: new mongoose.Types.ObjectId(req.params.userID) });
    console.log(hospital);

    if (!hospital) {
        res.status(404);
        throw new Error('Hospital not found');
    }
    let doctor = await Doctor.findOne({ email });
    console.log(doctor);

    if (doctor) {
        hospital.doctorInformation.push(doctor);
    } else {
        console.log("create");
        doctor = new Doctor({
            name,
            specialities,
            contact,
            email,
        });
        console.log(doctor);
        await doctor.save();
        hospital[0].doctorInformation.push(doctor);
    }

    await hospital.save();
    res.status(201).json({ message: 'Doctor added to hospital successfully' });
});

module.exports = { doctorList, addDoctor }; 