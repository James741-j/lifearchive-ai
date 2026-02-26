const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');

router.get('/trustees', securityController.getTrustees);
router.get('/will-progress', securityController.getWillProgress);

module.exports = router;
