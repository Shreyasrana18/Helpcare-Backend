const express = require('express');
const router = express.Router();
const { healthInfo, personalInfo, timelineInfo, createPersonalInfo } = require('../controllers/patientController');

router.route('/healthinfo').get(healthInfo);
router.route('/personalinfo').post(createPersonalInfo);
router.route('/personalinfo/:id').get(personalInfo);
router.route('/timelineinfo').get(timelineInfo);

module.exports = router;