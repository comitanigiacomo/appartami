const express = require('express');
const router = express.Router();
const PreferenceController = require('../controllers/preferenceController');

// Ottiene le preferenze
router.get('/get', PreferenceController.getPreferences);

// Aggiunge una nuova preferenza
router.post('/add', PreferenceController.addPreference);

// Elimina una preferenza
router.delete('/delete/:id', PreferenceController.deletePreference);

module.exports = router;
