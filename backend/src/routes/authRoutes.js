const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Rotta per il login degli utenti
router.post('/login', authController.login);

// Rotta per il logout degli utenti
router.post('/logout', authController.logout);

module.exports = router;
