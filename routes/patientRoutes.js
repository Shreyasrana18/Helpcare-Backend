const express = require('express');
const router = express.Router();
const { healthinfo, personalInfo, timelineInfo, createPersonalInfo ,createHealthInfo,updatePersonalInfo, deletePersonalInfo, updateHealthInfo, deleteHealthInfo} = require('../controllers/patientController');

router.route('/healthinfo/:id').get(healthinfo).put(updateHealthInfo).delete(deleteHealthInfo);
router.route('/healthinfo').post(createHealthInfo);

router.route('/personalinfo/:id').get(personalInfo).put(updatePersonalInfo).delete(deletePersonalInfo);
router.route('/personalinfo').post(createPersonalInfo);

router.route('/timelineinfo').get(timelineInfo);

module.exports = router; 