const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


// Route per la registrazione degli utenti
router.post('/register', UserController.registerUser);

// Route per l'eliminazione degli utenti
router.delete('/delete/:id', UserController.deleteUser);

// Route per restituire tutti gli utenti
router.get('/getUsers',UserController.getUsers);

router.get('/user/me', UserController.getUserByUsername);

module.exports = router;
