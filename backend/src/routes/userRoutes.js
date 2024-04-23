const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// route per la creazione di un nuovo utente
router.post('/users', userController.createUser);

module.exports = router;