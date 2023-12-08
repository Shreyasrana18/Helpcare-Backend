const express = require('express');
const router = express.Router();

const { getInformation, updateInformation, addreport, getReportDiagnostic } = require('../controllers/Diagnostic/diagnosticController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/diagnosticinfo/:userID').get(getInformation).put(updateInformation);
router.route('/report/:userID').post(addreport).get(getReportDiagnostic);

module.exports = router;