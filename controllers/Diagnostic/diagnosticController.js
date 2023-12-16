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
    const information = await Diagnostic.find({userID: new mongoose.Types.ObjectId(req.params.userID)}).populate('diagnosticReport').populate('patientID');
    if(!information){
        res.status(404);
        throw new Error('Report not found');
    }
    res.status(201).json(information[0]);
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

const creatediagnosticID =async (userID) => {
    if(!userID){
        res.status(404);
        throw new Error('Enter userID');
    }
    const diagnostic = new Diagnostic({
        userID: userID,
    });
    try{
        await diagnostic.save();
    }catch(error){
        console.error('Error saving diagnostic:',error);
    }
    return diagnostic;
};

// returns all diagnostic reports uploaded by the diagnostic centre
const getReportDiagnostic = asyncHandler(async (req,res ) => {
    if(req.params.userID != req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }
    const diagnostic = await Diagnostic.find({userID: new mongoose.Types.ObjectId(req.params.userID)}).populate('diagnosticReport');
    res.status(201).json(diagnostic[0].diagnosticReport);
});

const addreport = asyncHandler(async (req,res ) => {
    if(req.params.userID != req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }
    const diagnostic = await Diagnostic.find({userID: new mongoose.Types.ObjectId(req.params.userID)});
    const patient = await Patient.find({userID: new mongoose.Types.ObjectId(req.body.patientID)});
    
    if(!patient){
        res.status(404);
        throw new Error('Patient not found');
    }
    if(patient[0].activeFlag == false){
        res.status(404);
        throw new Error('Patient not active');
    }
    const report = new Report({
        date: req.body.date,
        event: req.body.event,
        description: req.body.description,
        attachments: req.body.attachments,
        diagnosticCenterName: diagnostic[0].name,
    });

    if(!diagnostic[0].patientID.includes(patient[0]._id)){
        diagnostic[0].patientID.push(patient[0]._id);
    }
    try{
        await report.save();
        diagnostic[0].diagnosticReport.push(report._id);
        patient[0].report.push(report._id);
        await diagnostic[0].save();
        await patient[0].save();
    }catch(error){
        console.error('Error saving report:',error);
    }
    res.status(201).json(report);
});

module.exports = {getInformation, updateInformation, creatediagnosticID, getReportDiagnostic, addreport};