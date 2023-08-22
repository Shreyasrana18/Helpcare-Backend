const asyncHandler = require('express-async-handler');
const Report = require('../../models/reportModel');
const Diagnostic = require('../../models/diagnosticModel');
const Patient = require('../../models/patientModel');
const mongoose = require('mongoose');


const getInformation = asyncHandler(async (req,res ) => {
    if(req.params.userID != req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }
    const information = await Diagnostic.find({userID: new mongoose.Types.ObjectId(req.params.userID)});
    if(!information){
        res.status(404);
        throw new Error('Report not found');
    }
    res.status(201).json(information);
});

const updateInformation = asyncHandler(async (req,res ) => {
    if(req.params.userID != req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }
    const filter = {userID: new mongoose.Types.ObjectId(req.params.userID)};
    const update = {
        $set: {
            'name': req.body.name,
            'address': req.body.address,
            'contact': req.body.contact,
            'email': req.body.email,
        }
    }
    const options = {new: true};
    const diagnostic = await Diagnostic.findOneAndUpdate(filter,update,options);
    if(!diagnostic){
        res.status(404);
        throw new Error('Diagnostic not found');
    }
    res.status(201).json(diagnostic);

});

const creatediagnosticID = asyncHandler(async (req,res ) => {
    if(req.params.userID != req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }
    const diagnostic = new Diagnostic({
        userID: req.params.userID,
    });
    try{
        await diagnostic.save();
    }catch(error){
        console.error('Error saving diagnostic:',error);
    }
    res.status(201).json(diagnostic);
});

const getReport = asyncHandler(async (req,res ) => {
    if(req.params.userID != req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }
    const diagnostic = await Diagnostic.find({userID: new mongoose.Types.ObjectId(req.params.userID)}).populate('diagnosticReport');
    res.status(201).json(diagnostic.diagnosticReport);
});

const addreport = asyncHandler(async (req,res ) => {
    if(req.params.userID != req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }
    const report = new Report({
        date: req.body.date,
        event: req.body.event,
        description: req.body.description,
        attachments: req.body.attachments
    });
    const diagnostic = await Diagnostic.find({userID: new mongoose.Types.ObjectId(req.params.userID)});
    const patient = await Patient.find({userID: new mongoose.Types.ObjectId(req.body.patientID)});
    if(!patient){
        res.status(404);
        throw new Error('Patient not found');
    }
    try{
        await report.save();
        await diagnostic.diagnosticReport.push(report._id);
    }catch(error){
        console.error('Error saving report:',error);
    }
});

module.exports = {getInformation, updateInformation, creatediagnosticID, getReport};