const express = require('express');
const router = express.Router();
const { doctorList, updateDoctorinfo, deleteDoctorinfo, changePassword,loginDoctor } = require('../controllers/Doctor/doctorinfoController');
const { patientListnames, patientTimeHealthinfo, addTimelineinfo } = require('../controllers/Doctor/doctorPatientController');

router.route('/doctorinfo/:doctorID').get(doctorList).post(updateDoctorinfo).delete(deleteDoctorinfo).put(changePassword);

router.route('/patientinfo/:doctorID').get(patientTimeHealthinfo);
router.route('/patientname/:doctorID').get(patientListnames);

router.route('/timelineinfo/:doctorID').post(addTimelineinfo);
router.route('/doctorlogin').post(loginDoctor);

module.exports = router;