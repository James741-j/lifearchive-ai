const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.getMessages);
router.post('/schedule', messageController.scheduleMessage);

module.exports = router;
