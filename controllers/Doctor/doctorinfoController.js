const asyncHandler = require('express-async-handler');
const Doctor = require('../../models/doctorModel');

// get list of doctor information
const doctorList = asyncHandler(async (req, res) => {
    const doctorinfo = await Doctor.find({ _id: req.params.doctorID });
    if (!doctorinfo) {
        res.status(404);
        throw new Error('Doctor not found');
    }

    res.status(201).json(doctorinfo[0].doctorInformation);
});

// update doctor information
const updateDoctorinfo = asyncHandler(async (req, res) => {
    
    const filter = { _id: req.params.doctorID };
    const update = {
        $set: {
            name: req.body.name,
            specialities: req.body.specialities,
            contact: req.body.contact,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        },
    };
    const doctor = await Doctor.findOneAndUpdate(filter, update, {
        new: true,
    });
    if (!doctor) {
        res.status(404);
        throw new Error('Doctor not found');
    }
    res.status(201).json(doctor);
});

// delete doctor information
const deleteDoctorinfo = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.doctorID);
    if (!doctor) {
        res.status(404);
        throw new Error('Doctor not found');
    }
    await doctor.deleteOne({ _id: req.params.doctorID });
    res.status(201).json({ message: 'Doctor removed' });
});

// change password
const changePassword = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.doctorID };
    const update = {
        $set: {
            password: req.body.password,
        },
    };
    const options = { new: true };
    if (req.body.password != req.body.confirmpassword) {
        res.status(401);
        throw new Error('Password does not match');
    }
    const doctor = await Doctor.findOneAndUpdate(filter, update, options);
    res.status(201).json(doctor);
});

module.exports = { doctorList, updateDoctorinfo, deleteDoctorinfo , changePassword};