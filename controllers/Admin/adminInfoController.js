const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminModel");
const mongoose = require("mongoose");

// get information of a admin
const adminInfo = asyncHandler(async (req, res) => {
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
    res.status(201).json(admininfo[0].hospitalInformation);
});

// create admin id
const createAdminID = asyncHandler(async (req, res) => {
    const { userID } = req.body;
    if (!userID) {
        res.status(404);
        throw new Error("Enter all required fields");
    }
    if (userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const admin = new Admin({
        userID: userID
    });
    try {
        await admin.save();
    } catch (error) {
        console.error('Error saving admin:', error);
    }
    res.status(201).json(admin['hospitalInformation']);
});

// update information of admin
const updateAdmininfo = asyncHandler(async (req, res) => {
    if (req.params.userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = {
        $set: {
            'hospitalInformation.name': req.body.name,
            'hospitalInformation.address': req.body.address,
            'hospitalInformation.contact': req.body.contact,
            'hospitalInformation.email': req.body.email,
            'hospitalInformation.specialities': req.body.specialities,
            'hospitalInformation.rating': req.body.rating,
            'hospitalInformation.description': req.body.description,
        }
    };
    const options = { new: true };
    const admin = await Admin.findOneAndUpdate(filter, update, options); //return dict
    if (!admin) {
        res.status(404);
        throw new Error("admin not found");
    }
    res.status(201).json(admin.hospitalInformation);
});

// delete information of admin
const deleteAdmininfo = asyncHandler(async (req, res) => {
    if (req.params.userID != req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const filter = { userID: new mongoose.Types.ObjectId(req.params.userID) };
    const update = { $unset: { hospitalInformation: 1 } };
    const options = { new: true };
    const admin = await Admin.findOneAndUpdate(filter, update, options);
    if (!admin) {
        res.status(404);
        throw new Error("admin not found");
    }
    res.status(200).json({ message: "Admin's Information removed" });
});


    module.exports = { adminInfo, updateAdmininfo, createAdminID , deleteAdmininfo};