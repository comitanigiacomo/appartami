const express = require('express');
const router = express.Router();
const userDistributionController = require('../controllers/userDistributionController');

// Route per distribuire gli utenti negli appartamenti
router.post('/distribute-users', userDistributionController.distribute);

module.exports = router;
