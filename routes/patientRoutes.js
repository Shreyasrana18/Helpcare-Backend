const express = require('express');
const router = express.Router();

const { personalInfo, createPersonalInfo, updatePersonalInfo, deletePersonalInfo, generateQRcode } = require('../controllers/Patient/patientController');
const { healthinfo, updateHealthInfo, deleteHealthInfo } = require('../controllers/Patient/HealthInformationController');
const { timelineInfo, updateTimelineInfo, deleteTimelineInfo } = require('../controllers/Patient/timelineController');
const validateToken = require('../middleware/validateTokenHandler');

// Middleware to validate token
router.use(validateToken);
// Routes for health information of patient
router.route('/healthinfo/:userID').get(healthinfo).put(updateHealthInfo).delete(deleteHealthInfo);

// Routes for personal information of patient
router.route('/personalinfo/:userID').get(personalInfo).put(updatePersonalInfo).delete(deletePersonalInfo);
router.route('/personalinfo').post(createPersonalInfo);
router.route('/getqr/:userID').get(generateQRcode);

// Routes for timeline information of patient
router.route('/timelineinfo/:userID').get(timelineInfo).put(updateTimelineInfo).delete(deleteTimelineInfo);

module.exports = router; 