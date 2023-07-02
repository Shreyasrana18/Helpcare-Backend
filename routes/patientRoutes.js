const express = require('express');
const router = express.Router();
const { healthinfo, personalInfo, timelineInfo, createPersonalInfo ,createHealthInfo} = require('../controllers/patientController');

router.route('/healthinfo/:id').get(healthinfo);
router.route('/healthinfo').post(createHealthInfo);
router.route('/personalinfo').post(createPersonalInfo);
router.route('/personalinfo/:id').get(personalInfo);
router.route('/timelineinfo').get(timelineInfo);

module.exports = router; 