const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Rotta per il login degli utenti
router.post('/login', authController.login);

module.exports = router;
