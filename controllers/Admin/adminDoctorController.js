const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminModel");
const Doctor = require("../../models/doctorModel");
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

const removeDoctor = async (hospitalId, doctorId) => {
    try {
      const hospital = await Admin.findByIdAndUpdate(
        hospitalId,
        { $pull: { doctorInformation: doctorId } },
        { new: true }
      );
  
      console.log(hospital.doctorInformation); // Updated doctorInformation array
    } catch (error) {
      console.error('Error removing doctor:', error);
    }
  };

const removeDoctorDb = asyncHandler(async (req, res) => {
    const { doctorID } = req.body;
    const hospitalID = req.params.userID;
    removeDoctor(hospitalID,doctorID);
    res.status(201).json({ message: 'Doctor removed from hospital successfully' });
});

module.exports = { doctorList, addDoctor, removeDoctorDb }; 