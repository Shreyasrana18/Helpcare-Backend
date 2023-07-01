
const Patient = require("../models/patientModel");

const healthInfo = (req, res) => {
    res.status(200).json({ message: "patient health info route" });
};

const personalInfo = (req, res) => {
    // const personalinfo =  Patient.find({});
    // if (personalinfo) {
    //     res.status(201).json(personalinfo);
    // } else {
    //     res.status(404);
    //     throw new Error("Patient not found");
    // }

    res.status(200).json({ message : "patient personal info route"});
};

const createPersonalInfo = (req, res) => {
    console.log(req.body);
    const { _id, name, email } = req.body;
    const patient = Patient.create({
        _id,
        name, 
        email
    });
    res.status(201).json(patient);
};

const timelineInfo = (req, res) => {
    res.status(200).json({ message: "patient health timeline info route" });
};

module.exports = { healthInfo, personalInfo, timelineInfo, createPersonalInfo };