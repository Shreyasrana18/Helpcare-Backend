const express = require('express');
const router = express.Router();

const { personalInfo, createPersonalInfo, updatePersonalInfo, deletePersonalInfo } = require('../controllers/patientController');
const { healthinfo, updateHealthInfo, deleteHealthInfo } = require('../controllers/HealthInformationController');
const { timelineInfo, updateTimelineInfo, deleteTimelineInfo } = require('../controllers/timelineController');

// Routes for health information of patient
router.route('/healthinfo/:userID').get(healthinfo).put(updateHealthInfo).delete(deleteHealthInfo);

// Routes for personal information of patient
router.route('/personalinfo/:userID').get(personalInfo).put(updatePersonalInfo).delete(deletePersonalInfo);
router.route('/personalinfo').post(createPersonalInfo);

// Routes for timeline information of patient
router.route('/timelineinfo/:userID').get(timelineInfo).put(updateTimelineInfo).delete(deleteTimelineInfo);

module.exports = router; 