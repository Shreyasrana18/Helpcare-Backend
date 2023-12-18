const express = require('express');
const router = express.Router();

const {uploadprofilephoto, upload, uploadDocuments} = require('../controllers/Patient/patientController');

router.use(express.urlencoded({ extended: false }));
router.route('/upload/:userID').post(upload.single('file'),uploadprofilephoto);
router.route('/uploadDocuments').post(upload.single('file'),uploadDocuments);

module.exports = router;