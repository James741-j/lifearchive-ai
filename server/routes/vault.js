const express = require('express');
const router = express.Router();
const vaultController = require('../controllers/vaultController');
const upload = require('../middleware/upload');

router.get('/', vaultController.getMemories);
router.post('/upload', upload.single('file'), vaultController.uploadMemory);

module.exports = router;
