const express = require('express');
const router = express.Router();

const {getInformation,updateInformation, creatediagnosticID} = require('../controllers/Diagnostic/diagnosticController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/diagnosticinfo/:userID').get(getInformation).put(updateInformation).post(creatediagnosticID);

module.exports = router;