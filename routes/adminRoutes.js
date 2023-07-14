const express = require('express');
const router = express.Router();

const { adminInfo, updateAdmininfo, createAdminID, deleteAdmininfo } = require('../controllers/Admin/adminInfoController');
const { doctorList, addDoctor, removeDoctorDb, linkPatient } = require('../controllers/Admin/adminDoctorController');
const { patientList, addPatient, removePatientDb } = require('../controllers/Admin/adminPatientController');
const validateToken = require('../middleware/validateTokenHandler');


// Middleware to validate token
router.use(validateToken);

router.route('/admininfo').post(createAdminID)
router.route('/admininfo/:userID').get(adminInfo).put(updateAdmininfo).delete(deleteAdmininfo);

router.route('/doctorlist/:userID').get(doctorList).post(addDoctor).delete(removeDoctorDb).put(linkPatient);

router.route('/patientlist/:userID').get(patientList).post(addPatient).delete(removePatientDb);

module.exports = router; 