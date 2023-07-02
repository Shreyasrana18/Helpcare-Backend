const express = require('express');
const router = express.Router();

const { personalInfo, createPersonalInfo, updatePersonalInfo, deletePersonalInfo } = require('../controllers/patientController');
const { healthinfo, createHealthInfo, updateHealthInfo, deleteHealthInfo } = require('../controllers/HealthInformationController');
const { timelineInfo,createTimelineInfo, updateTimelineInfo, deleteTimelineInfo } = require('../controllers/timelineController');

// Routes for health information of patient
router.route('/healthinfo/:id').get(healthinfo).put(updateHealthInfo).delete(deleteHealthInfo);
router.route('/healthinfo').post(createHealthInfo);

// Routes for personal information of patient
router.route('/personalinfo/:id').get(personalInfo).put(updatePersonalInfo).delete(deletePersonalInfo);
router.route('/personalinfo').post(createPersonalInfo);

// Routes for timeline information of patient
router.route('/timelineinfo/:id').get(timelineInfo).put(updateTimelineInfo).delete(deleteTimelineInfo);
router.route('/timelineinfo').post(createTimelineInfo);

module.exports = router; 