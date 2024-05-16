const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route per la registrazione degli utenti
router.post('/register', UserController.registerUser);

// Route per l'eliminazione degli utenti
router.delete('/delete/:id', UserController.deleteUser);

// Route per restituire tutti gli utenti
router.get('/getUsers', UserController.getUsers);

// Route per ottenere l'utente corrente
router.get('/user/me', UserController.getUserByUsername);

// Route per aggiornare l'email dell'utente
router.put('/user/updateEmail', UserController.updateEmail);

// Route per aggiornare lo username dell'utente
router.put('/user/updateUsername', UserController.updateUsername);

// Route per aggiornare la password dell'utente
router.put('/user/updatePassword', UserController.updatePassword);

// Route for creating a new room (stanza)
router.post('/createStanza', UserController.createStanza);

// Route for adding apartments to a room
router.post('/insertApartmentsInStanza', UserController.insertApartmentsInStanza);

// Route for adding people to a room
router.post('/insertPeopleInStanza', UserController.insertPeopleInStanza);

module.exports = router;
