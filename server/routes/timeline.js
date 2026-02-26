const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timelineController');

router.get('/data', timelineController.getTimelineData);
router.get('/milestones', timelineController.getMilestones);

module.exports = router;
