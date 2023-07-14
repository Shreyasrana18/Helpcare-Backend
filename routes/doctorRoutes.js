const express = require('express');
const router = express.Router();
const { doctorList, updateDoctorinfo, deleteDoctorinfo } = require('../controllers/Doctor/doctorinfoController');
const { patientListnames, patientTimeHealthinfo, updatePatientTimelineinfo } = require('../controllers/Doctor/doctorPatientController');

router.route('/doctorinfo/:doctorID').get(doctorList).post(updateDoctorinfo).delete(deleteDoctorinfo);

router.route('/patientinfo/:doctorID').get(patientTimeHealthinfo).put(updatePatientTimelineinfo);
router.route('/patientname/:doctorID').get(patientListnames);

module.exports = router;