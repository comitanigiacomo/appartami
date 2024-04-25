const express = require('express');
const router = express.Router();
const UserDistributionController = require('../controllers/userDistributionController');

// Route per la distribuzione degli utenti negli appartamenti
router.post('/distribute', UserDistributionController.distributeUsers);

module.exports = router;