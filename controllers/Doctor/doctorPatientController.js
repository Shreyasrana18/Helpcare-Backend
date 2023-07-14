const asyncHandler = require('express-async-handler');

const Doctor = require('../../models/doctorModel');

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
    res.status(201).json({
        timelineInformation: doctorinfo[0].patientID[0].timelineInformation,
        healthInformation: doctorinfo[0].patientID[0].healthInformation
    });
});

// update patient timeline info 
const updatePatientTimelineinfo = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.doctorID };
    const update = {
        $set: {
            'patientID.timelineinfo': req.body.timelineinfo,
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

module.exports = { patientListnames, patientTimeHealthinfo, updatePatientTimelineinfo };
