const express = require('express');
const router = express.Router();
const { healthInfo, personalInfo, timelineInfo, createPersonalInfo } = require('../controllers/patientController');

router.route('/healthinfo').get(healthInfo);
router.route('/personalinfo').get(personalInfo).post(createPersonalInfo);
router.route('/timelineinfo').get(timelineInfo);

module.exports = router;