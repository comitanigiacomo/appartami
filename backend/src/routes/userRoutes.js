const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Route per la registrazione degli utenti
router.post('/register', UserController.registerUser);

// Route per il login degli utenti
router.post('/login', UserController.loginUser);

module.exports = router;
