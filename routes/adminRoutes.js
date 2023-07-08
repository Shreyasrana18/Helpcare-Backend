const express = require('express');
const router = express.Router();

const { adminInfo, updateAdmininfo, createAdminID, deleteAdmininfo } = require('../controllers/Admin/adminInfoController');
const validateToken = require('../middleware/validateTokenHandler');


// Middleware to validate token
router.use(validateToken);

router.route('/admininfo').post(createAdminID)
router.route('/admininfo/:userID').get(adminInfo).put(updateAdmininfo).delete(deleteAdmininfo);

module.exports = router;