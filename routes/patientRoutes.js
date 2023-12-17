const express = require('express');
const router = express.Router();

const { personalInfo,updatePersonalInfo, deletePersonalInfo, generateQRcode,uploadprofilephoto, upload } = require('../controllers/Patient/patientController');
const { healthinfo, updateHealthInfo, deleteHealthInfo } = require('../controllers/Patient/HealthInformationController');
const { timelineInfo, removeTimeline, removeReport, getTimeline,getReport, patientUnlinkDoctor, addTimeline, addReport } = require('../controllers/Patient/timelineController');
const validateToken = require('../middleware/validateTokenHandler');


// Middleware to validate token
router.use(validateToken);
// Routes for health information of patient
router.route('/healthinfo/:userID').get(healthinfo).put(updateHealthInfo).delete(deleteHealthInfo);

// Routes for personal information of patient
router.route('/personalinfo/:userID').get(personalInfo).put(updatePersonalInfo).delete(deletePersonalInfo);
router.route('/getqr/:userID').get(generateQRcode);

// Routes for timeline information of patient
router.route('/timelineinfo/:userID').get(timelineInfo);
router.route('/timeline/:userID').delete(removeTimeline).get(getTimeline).post(addTimeline);
router.route('/report/:userID').delete(removeReport).get(getReport).post(addReport);

// Routes to unlink doctor from patient
router.route('/timeline/unlink/:userID').post(patientUnlinkDoctor);
router.route('/upload/:userID').post(upload.single("file"),uploadprofilephoto);

// Routes to upload profile photo

module.exports = router; 